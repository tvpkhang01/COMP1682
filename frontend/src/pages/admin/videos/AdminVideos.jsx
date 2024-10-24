import "./AdminVideos.css";
import { useState, useEffect } from "react";
import { getVideos, getImageUrl, deleteVideo } from "../../../api/Api";
import { FaTrashAlt } from "react-icons/fa";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await getVideos();
      if (res?.data) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (videoId) => {
    if (!videoId) return;
    console.log(videoId);
    try {
      if (window.confirm("Are you sure you want to delete")) {
        const res = await deleteVideo(videoId);
        if (res.status == 200) {
          alert("Video is deleted");
          loadVideos();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-videos-container">
      {videos.length > 0 ? (
        videos.map((item, index) => (
          <div key={index} className="admin-video-card">
            <img src={getImageUrl(item.imageUrl)} alt="Video cover" />
            <div className="admin-video-info">
              <h2>{item.title}</h2>
              <h3>{item.name}</h3>
              <h3>{item.category}</h3>
            </div>
            <FaTrashAlt
              className="admin-video-trash-icon"
              onClick={() => handleDelete(item._id)}
            />
          </div>
        ))
      ) : (
        <p>Nothing to show here</p>
      )}
    </div>
  );
};

export default Videos;
