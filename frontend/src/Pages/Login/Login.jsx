/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import axios from "../../axios";
import { AuthContext } from "../../Context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setError(false);
      setErrorMsg("");
      if (data.user.status === "blocked") {
        setError(true);
        setErrorMsg("Your account has been blocked. Please contact the admin.");
        return;
      }
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      navigate("/home");
    } catch (err) {
      setError(true);
      setErrorMsg(err.response.data.msg);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome to Entrepreneur Hub</h1>
          <p>
            Join our vibrant community of entrepreneurs and investors. Explore
            opportunities, connect with like-minded individuals, and pave your
            path to success. Log in now to begin your journey!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <div className="container">
            <div className="content">
              <div className="content__container">
                <p className="content__container__text">Let's</p>
                <ul className="content__container__list">
                  <li className="content__container__list__item">innovate</li>
                  <li className="content__container__list__item">invest</li>
                  <li className="content__container__list__item">team up</li>
                  <li className="content__container__list__item">succeed</li>
                </ul>
              </div>
            </div>
          </div>
          <form>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <span>{errorMsg}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
