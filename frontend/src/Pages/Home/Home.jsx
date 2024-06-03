import { useState } from "react";
import Navbar from "../../Components/Home/navbar/Navbar";
import Posts from "../../Components/Home/posts/Posts";
import Share from "../../Components/Home/share/Share";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import "./home.scss";

const Home = () => {
  const [domain, setDomain] = useState("");
  const [refresh, setRefresh] = useState(false);
  JavascriptTimeAgo.addDefaultLocale(en);
  return (
    <div className="home">
      <Navbar domain={domain} setDomain={setDomain} />
      <Share setRefresh={setRefresh} />
      <Posts
        domain={domain}
        setDomain={setDomain}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Home;
