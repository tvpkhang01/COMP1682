/* eslint-disable react/prop-types */
import { useState } from "react";
import DropFile from "./dropFile/DropFile";
import "./Upload.css";
import {
  createVideo,
  updateVideo,
  uploadVideo,
  uploadImage,
} from "../../api/Api";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import { FaImage, FaArrowLeft } from "react-icons/fa";

const categories = [
  "Music",
  "Education",
  "Sports",
  "Gaming",
  "News",
  "Entertainment",
];

const Upload = ({ selectedVideo, setSelectedVideo, onClose }) => {
  const { state, logoutAuth } = useContext(AppContext);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState({
    title: selectedVideo ? selectedVideo.title : "",
    description: selectedVideo ? selectedVideo.description : "",
    category: selectedVideo ? selectedVideo.category : "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const clearInputs = () => {
    setVideo(null);
    setImage(null);
    setInfo({ title: "", description: "", category: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const videoUrl = await addVideo();
      const imageUrl = await addImage();

      const data = {
        videoUrl: videoUrl ? videoUrl : selectedVideo?.videoUrl,
        imageUrl: imageUrl ? imageUrl : selectedVideo?.cover,
        title: info.title,
        description: info.desc,
        category: info.category,
      };

      if (selectedVideo) {
        const res = await updateVideo(selectedVideo._id, data);
        if (res.status == 200) {
          clearInputs();
          setSelectedVideo(res.data);
          setLoading(false);
          onClose(false);
        }
      } else {
        const res = await createVideo(data);
        if (res.status == 200) {
          clearInputs();
          setLoading(false);
          navigate(`/video/${res.data._id}`);
        }
      }
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
      clearInputs();
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const addVideo = async () => {
    if (!video) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + video.name;
      formData.append("filename", filename);
      formData.append("file", video);

      const res = await uploadVideo(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addImage = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + image.name;
      formData.append("filename", filename);
      formData.append("file", image);

      const res = await uploadImage(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="upload">
      <div className={`wrapper ${state?.theme} container`}>
        <h2 className="heading">
          {selectedVideo && (
            <FaArrowLeft
              onClick={() => onClose(false)}
              style={{ marginRight: "1rem", cursor: "pointer" }}
            />
          )}
          {selectedVideo ? "Update Video" : "Upload new video"}
        </h2>
        <div className="inputs-wrapper">
          <div className="left">
            {selectedVideo ? (
              <DropFile
                file={video}
                setFile={setVideo}
                selectedVideo={selectedVideo}
              />
            ) : (
              <DropFile file={video} setFile={setVideo} />
            )}
          </div>
          <div className="right">
            <form onSubmit={handleSubmit} className="upload-form">
              <input
                value={info.title}
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
                type="text"
                required
                placeholder="Title"
              />
              <label htmlFor="upload-image">
                <input
                  type="file"
                  id="upload-image"
                  accept="image/png, image/jpg, image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleImage}
                />
                <div className="upload-image">
                  <FaImage className="camera-icon" />
                  {image ? (
                    `${image.name}`
                  ) : selectedVideo ? (
                    selectedVideo.imageUrl
                  ) : (
                    <span>Select image</span>
                  )}
                </div>
              </label>
              <textarea
                value={info.desc}
                onChange={(e) => setInfo({ ...info, desc: e.target.value })}
                placeholder="Description"
              />
              <select
                value={info.category}
                onChange={(e) => setInfo({ ...info, category: e.target.value })}
                required
                className="category"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={loading}>
                {loading
                  ? "Please wait for a minute"
                  : `${selectedVideo ? "Save" : "Upload"} `}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
