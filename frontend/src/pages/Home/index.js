import { useState, useEffect } from "react";
import JobItem from "../../components/JobItem";
import { Spin } from "antd";
import "./index.css";
import { mainUrl } from "../../mainUrl";
import Header from "../../layouts/Header";
import { headerContent } from "../../store/data";

const Home = () => {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getJobsList();
  }, []);

  const getJobsList = async () => {
    const apiUrl = `${mainUrl}/jobs`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      setJobsList(fetchedData);
      setLoading(false);
    }
  };

  const filteredJobsList = jobsList.filter(
    (item) =>
      item.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.jobRole.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.jobLocation.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <Header headerContent={headerContent} />
      <div className="home-page-bg-container">
        <div className="home-page-main-container">
          <div className="home-search-container">
            <input
              type="search"
              placeholder="Search by Company, Job Roles and Location"
              className="border-r p-2"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary">Find Jobs</button>
          </div>
          <a className="self-center my-[20px]" href="/student/login">
            <span className="text-blue-800 font-bold">Post your Resume</span> -
            For better UserExperience
          </a>
          <a
            className="text-blue-800 font-bold self-center mt-[-5px]"
            href="/employer/login"
          >
            Post a Job on CAREERCONNECT
          </a>
          <hr className="self-center w-75" />
          <h1 className="self-center">Jobs</h1>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <div className="jobs-list-container">
              {filteredJobsList.length > 0 &&
                filteredJobsList.map((item) => (
                  <JobItem item={item} key={item._id} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
