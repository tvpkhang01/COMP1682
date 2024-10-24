import { useContext, useEffect, useState } from "react";
import "./Admin.css";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import AdminVideos from "./videos/AdminVideos";
import AdminChannels from "./channels/AdminChannels";

const Admin = () => {
  const { state } = useContext(AppContext);
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const adminUser = state?.auth.admin;
      if (!adminUser) {
        alert("You are not admin!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("You are not logged in");
      navigate("/");
    }
  }, []);

  return (
    <div className="admin">
      <div className="admin-wrapper">
        <div className="tab-wrapper">
          <div
            className={tabIndex == 0 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(0)}
          >
            <span>Videos</span>
          </div>
          <div
            className={tabIndex == 1 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(1)}
          >
            <span>Channels</span>
          </div>
        </div>
        <div className="tab-content">
          {tabIndex == 0 && <AdminVideos />}
          {tabIndex == 1 && <AdminChannels />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
