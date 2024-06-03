import { Link, Navigate } from "react-router-dom";
import "./register.scss";
import axios from "../../axios";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/auth/register",
        {
          username: username,
          email: email,
          password: password,
          accountType: type,
        },
        {
          withCredentials: true,
        }
      );
      setError(false);
      setErrorMsg("");
      setRedirect(true);
    } catch (err) {
      setError(true);
      setErrorMsg(err.response.data.msg);
    }
  };
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Join the community</h1>
          <p>
            Ready to embark on your entrepreneurial journey? Register now to
            access a wealth of resources, connect with investors, and bring your
            ideas to life. Sign up and start building your future today!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select an option</option>
              <option value="Investisseur">Investisseur</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
            {error && <span>{errorMsg}</span>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;