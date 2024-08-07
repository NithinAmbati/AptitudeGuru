import { Spin } from "antd";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";
import { mainUrl } from "../../../mainUrl";
import Header from "../../../layouts/Header";
import { EmployerHeaderContent } from "../../../store/data";

const JobsPosted = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");
  const [jobsPostedList, setJobsPostedList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getJobsPostedList = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(`${mainUrl}/employer/jobs/posted/`, options);
    if (response.ok) {
      const data = await response.json();
      setJobsPostedList(data);
      setLoading(false);
    }
  }, [jwtToken]);

  useEffect(() => {
    getJobsPostedList();
  }, [getJobsPostedList]);

  if (jwtToken === undefined) {
    return <Navigate to="/employer/login" />;
  }

  return (
    <>
      <Header headerContent={EmployerHeaderContent} />
      <div className="jobs-posted-container">
        <h1 className="jobs-posted-header">Jobs Posted</h1>
        <div className="jobs-posted-list">
          {isLoading ? (
            <Spin />
          ) : jobsPostedList.length > 0 ? (
            jobsPostedList.map((job) => (
              <div
                key={job._id}
                className="job-item"
                onClick={() => navigate(`/employer/jobs/posted/${job._id}`)}
              >
                <h2>{job.jobRole}</h2>
                <p>{job.jobLocation}</p>
                <p>Number of applications : {job.applications.length}</p>
                <p>
                  Posted on: {new Date(job.jobPostingDate).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <h1 className="empty-message">No Jobs Posted</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default JobsPosted;
