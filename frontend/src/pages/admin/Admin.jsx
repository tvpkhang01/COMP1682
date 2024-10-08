import { useContext, useEffect } from "react";
import "./Admin.css";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const { state } = useContext(AppContext);
  const adminUser = state?.auth.admin;
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminUser) {
      alert("You are not logged in");
      navigate("/");
    }
  }, []);

  return (
    <div className="admin">
      <div className="admin-wrapper">
        <p>Admin</p>
      </div>
    </div>
  );
};

export default Admin;
