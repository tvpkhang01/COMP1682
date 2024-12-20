import { useContext, useRef, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/Api";
import AppContext from "../../context/AppContext";

const Register = () => {
  const { state } = useContext(AppContext);
  const [errMessage, setErrMessage] = useState("");
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
    setErrMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const user = userRef.current.value;
    const pass = passRef.current.value;

    if (!email || !user || !pass) {
      setErrMessage("All fields are required");
      return;
    }
    try {
      const res = await register({ name: user, email, password: pass });
      if (res.status == 201) {
        alert("User registered successfully");
        handleClear();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className={`wrapper ${state?.theme}`}>
        <h2 className="heading">Register</h2>
        {errMessage && <span className="err-msg">{errMessage}</span>}
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" ref={userRef} placeholder="Username" />
          <input type="email" ref={emailRef} placeholder="Email" />
          <input
            type="password"
            ref={passRef}
            placeholder="Password"
            required
          />
          <span className="register-terms">
            By registering in you are agreeing to our Terms of Services and
            Privacy Policy.
          </span>
          <button type="submit">Register</button>
          <div className="action">
            Already an Account? Sign in <Link to="/login">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
