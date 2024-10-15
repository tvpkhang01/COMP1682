import { useState, useContext, useEffect } from "react";
import "./Settings.css";
import AppContext from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { updateChannel } from "../../../api/Api"; // Import the update function

const Settings = () => {
  const { id } = useParams();
  const { state, logoutAuth } = useContext(AppContext);
  const authUser = state?.auth;
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authUser) {
      alert("You must login first");
      navigate("/login");
    } else if (authUser.id !== id) {
      alert("You don't have permission to access this page");
      navigate("/");
    }
  }, [authUser, id, navigate]);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await updateChannel(id, { password: passwords.newPassword });
      if (res.status === 200) {
        alert("Password updated successfully");
        logoutAuth();
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <h2>Settings</h2>
        <form className="settings-form" onSubmit={handleSubmit}>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
