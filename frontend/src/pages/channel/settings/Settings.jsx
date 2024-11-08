import { useState, useContext, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./Settings.css";
import AppContext from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { updateChannel, addCoin } from "../../../api/Api";

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

  const handleAddCoin = async () => {
    try {
      const response = await addCoin(id);
      if (response.status === 200) {
        alert("Coins added successfully");
      }
    } catch (error) {
      console.error("Failed to add coins:", error);
      alert("Failed to add coins");
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <h2>Settings</h2>
        <p>Coins: {state?.channel?.coins}</p>
        <div>
          <h2>Add coins</h2>
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ad_4XcWIE7rcMN7-uzCxM2B7pAxxAzw4cZsN7rgAVMSLE74VyKCOMPkNwx9bIkKFAjNg14-8GqS4QkYI",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(() => {
                  handleAddCoin();
                });
              }}
              onError={(err) => {
                console.error("PayPal payment failed:", err);
                alert("PayPal payment failed. Please try again.");
              }}
            />
          </PayPalScriptProvider>
        </div>
        <form className="settings-form" onSubmit={handleSubmit}>
          <h2>Change Password</h2>
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
