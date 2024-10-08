import { useContext, useEffect } from "react";
import "./Settings.css";
import AppContext from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Settings = () => {
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const authUser = state?.auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      alert("You must login first");
      navigate("/login");
    } else if (authUser.id != id) {
      alert("You don't have permission to access this page");
      navigate("/");
    }
  }, []);

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <p>Settings</p>
      </div>
    </div>
  );
};

export default Settings;
