import Stories from "../../Components/Home/stories/Stories";
import Posts from "../../Components/Home/posts/Posts";
import Share from "../../Components/Home/share/Share";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
};

export default Home;
