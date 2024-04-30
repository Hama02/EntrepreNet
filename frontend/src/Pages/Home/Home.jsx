import Navbar from "../../Components/Home/navbar/Navbar";
import Posts from "../../Components/Home/posts/Posts";
import Share from "../../Components/Home/share/Share";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
