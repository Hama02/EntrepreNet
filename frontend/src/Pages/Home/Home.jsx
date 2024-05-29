import { useState } from "react";
import Navbar from "../../Components/Home/navbar/Navbar";
import Posts from "../../Components/Home/posts/Posts";
import Share from "../../Components/Home/share/Share";
import "./home.scss";

const Home = () => {
  const [domain, setDomain] = useState("");
  return (
    <div className="home">
      <Navbar domain={domain} setDomain={setDomain} />
      <Share />
      <Posts domain={domain} setDomain={setDomain} />
    </div>
  );
};

export default Home;
