import { useContext, useEffect } from "react";
import "./Admin.css";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const { state } = useContext(AppContext);
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
        <p>Admin</p>
      </div>
    </div>
  );
};

export default Admin;
