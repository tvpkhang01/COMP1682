import "./Home.css";
import head from "../../assets/headImg.png";
import VideoList from "../../components/videoItem/videoList/VideoList";

const Home = () => {
  return (
    <div className="home">
      <div className="head">
        <img src={head} alt="cover head" className="cover-head" />
        <div className="head-wrapper">
          <h2>My videos, my community, my stage.</h2>
          <p>Welcome to my website</p>
        </div>
      </div>
      <VideoList />
    </div>
  );
};

export default Home;
