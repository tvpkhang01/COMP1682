import { useState } from "react";
import DropFile from "./dropFile/DropFile";
import "./Upload.css";
import { createVideo, uploadVideo, uploadImage } from "../../api/Api";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import { FaImage } from "react-icons/fa";

const Upload = () => {
  const { state } = useContext(AppContext);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState({
    title: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const clearInputs = () => {
    setVideo(null);
    setImage(null);
    setInfo({ title: "", desc: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const videoUrl = await addVideo();
      const imageUrl = await addImage();
      const data = {
        videoUrl,
        imageUrl,
        title: info.title,
        description: info.desc,
      };
      console.log(data);
      const res = await createVideo(data);
      if (res.status == 200) {
        clearInputs();
        setLoading(false);
        navigate(`/video/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="upload">
      <div className={`wrapper ${state?.theme} container`}>
        <h2 className="heading">Upload new video</h2>
        <div className="inputs-wrapper">
          <div className="left">
            <DropFile file={video} setFile={setVideo} />
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
                  {image ? `${image.name}` : <span>Select image</span>}
                </div>
              </label>
              <textarea
                value={info.desc}
                onChange={(e) => setInfo({ ...info, desc: e.target.value })}
                placeholder="Description"
              />
              <button type="submit" disabled={loading}>
                {loading ? "Please wait for a minute" : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
