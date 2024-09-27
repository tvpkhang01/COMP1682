import { useState } from "react";
import DropFile from "./dropFile/DropFile";
import "./Upload.css";

import { FaImage } from "react-icons/fa";

const Upload = () => {
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState({
    title: "",
    desc: "",
  });

  const clearInputs = () => {
    setVideo(null);
    setImage(null);
    setInfo({ title: "", desc: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      video,
      image,
      title: info.title,
      desc: info.desc,
    };
    console.log(data);
    clearInputs();
  };

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  return (
    <div className="upload">
      <div className="wrapper container">
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
              <button>Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
