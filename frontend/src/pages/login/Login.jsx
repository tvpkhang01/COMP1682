/* eslint-disable react-hooks/exhaustive-deps */
import "./Login.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/Api";
import AppContext from "../../context/AppContext";

const Login = () => {
  const { state, loginAuth } = useContext(AppContext);
  const [errMessage, setErrMessage] = useState("");
  const userRef = useRef(null);
  const passRef = useRef(null);
  console.log(state?.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (state?.auth) {
      navigate("/");
    }
  }, [state]);

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
    setErrMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = userRef.current.value;
    const pass = passRef.current.value;
    if (!user || !pass) {
      setErrMessage("Please enter all fields");
      return;
    }
    try {
      const res = await login({ name: user, password: pass });
      if (res.status == 200) {
        loginAuth(res.data);
        handleClear();
      }
    } catch (err) {
      setErrMessage(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className={`wrapper ${state?.theme}`}>
        <h2 className="heading">Login</h2>
        {errMessage && <span className="err-msg">{errMessage}</span>}
        <form onSubmit={handleSubmit} className="form">
          <input type="text" ref={userRef} placeholder="Username" />
          <input type="password" ref={passRef} placeholder="Password" />
          <span className="login-terms">
            By logging in you are agreeing to our Terms of Services and Privacy
            Policy.
          </span>
          <button type="submit">Login</button>
          <div className="action">
            No Account? Sign up <Link to="/register">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
