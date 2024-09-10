import "./Login.css";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../context/theme/ThemeContext";

const Login = () => {
  const { state } = useContext(ThemeContext);
  const [errMessage, setErrMessage] = useState("");
  const userRef = useRef(null);
  const passRef = useRef(null);

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = userRef.current.value;
    const pass = passRef.current.value;
    if (!user || !pass) {
      setErrMessage("Please enter all fields");
      return;
    }
    console.log({ user, pass });
    handleClear();
  };

  return (
    <div className="login">
      <div className={`wrapper ${state?.theme}`}>
        <h2 className="heading">Login</h2>
        {errMessage && <span className="err-msg">{errMessage}</span>}
        <form onSubmit={handleSubmit} className="form">
          <input type="text" ref={userRef} placeholder="Username" />
          <input
            type="password"
            ref={passRef}
            placeholder="Password"
            
          />
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
