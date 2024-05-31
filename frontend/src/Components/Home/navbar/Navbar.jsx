/* eslint-disable react/prop-types */
import "./navbar.scss";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/authContext";
import { Dropdown } from "primereact/dropdown";
import axios from "../../../axios";

const Navbar = ({ domain, setDomain }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const domains = [
    { name: "Test domain1" },
    { name: "Test domain2" },
    { name: "Test domain3" },
    { name: "Test domain4" },
    { name: "sport" },
  ];

  const handleLogout = () => {
    setCurrentUser({});
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = async (e) => {
    setSearchText(e.target.value.replace(/ /g, "_"));
    try {
      const { data } = await axios.get(`posts/search?title=${searchText}`);
      setSearchResults(data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span>EntrepreNet</span>
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." onChange={handleSearch} />
          <div
            className="search-items"
            style={{ display: `${searchText.length === 0 ? "none" : "block"}` }}
          >
            {searchResults?.map((result) => (
              <div className="item" key={result._id}>
                <img
                  src={`http://localhost:8000/${result.picturePath}`}
                  alt=""
                />
                <h2>{result.title}</h2>
              </div>
            ))}
          </div>
          <div className="item">
            <Dropdown
              value={domain}
              onChange={(e) => setDomain(e.value)}
              options={domains}
              optionLabel="name"
              placeholder="Select a Domain"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
      </div>
      <div className="right">
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div
          className="user"
          onClick={() => (show ? setShow(false) : setShow(true))}
        >
          <img
            src={`http://localhost:8000/${currentUser?.profilePicture}`}
            alt=""
          />
          <span>{currentUser?.username}</span>
          {show && (
            <div className="mini-menu">
              <Link to={"/profile/edit"}>Check Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
