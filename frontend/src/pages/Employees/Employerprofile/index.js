import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import "./index.css";
import { Spin } from "antd";
import { mainUrl } from "../../../mainUrl";
import Header from "../../../layouts/Header";
import { EmployerHeaderContent } from "../../../store/data";

const EmployerProfile = () => {
  const jwtToken = Cookies.get("jwtToken");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(`${mainUrl}/profile/employer`, options);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setIsLoading(false);
    }
  }, [jwtToken]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleSave = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(`${mainUrl}/profile/employer`, options);
    if (response.ok) {
      await response.json();
    }
    setIsEditing(false);
  };

  return (
    <>
      <Header headerContent={EmployerHeaderContent} />
      <div className="profile-page-bg-container">
        {isLoading ? (
          <Spin />
        ) : (
          <div className="profile-page-container">
            <h2>Employer Profile</h2>
            <hr />
            <div>
              <strong>Username:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={userData.username || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              ) : (
                userData.username
              )}
            </div>
            <div>
              <strong>Email:</strong>
              {userData.email}
            </div>
            <div>
              <strong>Company Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="companyName"
                  value={userData.companyName || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, companyName: e.target.value })
                  }
                />
              ) : (
                userData.companyName
              )}
            </div>
            <div>
              <strong>Current JobRole :</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="currentJobRole"
                  value={userData.currentJobRole || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, currentJobRole: e.target.value })
                  }
                />
              ) : (
                userData.currentJobRole
              )}
            </div>
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerProfile;
