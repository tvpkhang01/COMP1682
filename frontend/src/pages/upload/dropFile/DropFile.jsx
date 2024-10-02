/* eslint-disable react/prop-types */
import "./DropFile.css";
import { MdCloudDownload } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";

const DropFile = ({ file, setFile, selectedVideo }) => {
  const handleFile = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "video/mp4") {
      setFile(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "video/mp4") {
      setFile(droppedFile);
    }
  };

  return (
    <div className="drop" onDragOver={handleDrag} onDrop={handleDrop}>
      <MdCloudDownload className="icon" />
      <h4>Drop your files here.</h4>

      <span className="filename">
        {file ? file.name : selectedVideo ? selectedVideo.videoUrl : ""}
      </span>

      <label htmlFor="upload-video">
        <input
          type="file"
          id="upload-video"
          accept="video/mp4"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <div className="upload-video">
          <BsFillCameraVideoFill className="video-icon" />
          <span>Select Video</span>
        </div>
      </label>
    </div>
  );
};

export default DropFile;
