import { useState, useEffect } from "react";
import { Link } from "react-scroll";

function Navbar() {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu;
    }
  }, []);

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      <div>
        <img src="./img/logo4.png" alt="Logoipsum" />
      </div>
      <a
        className={`nav__hamburger ${navActive ? "active" : ""}`}
        onClick={toggleNav}
      >
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
      </a>
      <div className={`navbar--items ${navActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link
              onClick={closeMenu}
              activeClass="navbar--active-content"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="heroSection"
              className="navbar--content"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              activeClass="navbar--active-content"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="AboutMe"
              className="navbar--content"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              activeClass="navbar--active-content"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="MyPortfolio"
              className="navbar--content"
            >
              Statistics
            </Link>
          </li>
          <li>
            <Link
              onClick={closeMenu}
              activeClass="navbar--active-content"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="testimonial"
              className="navbar--content"
            >
              Testimonials
            </Link>
          </li>
        </ul>
      </div>
      <div className="button-container">
        <Link
          onClick={closeMenu}
          activeClass="navbar--active-content"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          to="Contact"
          className="btn btn-outline-primary"
        >
          Contact Us
        </Link>
        <Link
          onClick={closeMenu}
          activeClass="navbar--active-content"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          to="Login"
          className="btn btn-outline-primary"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
