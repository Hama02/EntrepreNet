/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
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
                  <li className="content__container__list__item">
                    collaborate
                  </li>
                  <li className="content__container__list__item">succeed</li>
                </ul>
              </div>
            </div>
          </div>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
