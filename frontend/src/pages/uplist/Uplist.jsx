/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./Uplist.css";
import AppContext from "../../context/AppContext";
import { createPlaylist, updatePlaylist, uploadImage } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { FaImage, FaArrowLeft } from "react-icons/fa";

const Uplist = ({ selectedPlaylist, setSelectedPlaylist, onClose }) => {
  console.log(selectedPlaylist);
  const { state, logoutAuth } = useContext(AppContext);
  const [info, setInfo] = useState({
    title: selectedPlaylist ? selectedPlaylist.title : "",
    description: selectedPlaylist ? selectedPlaylist.description : "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearInputs = () => {
    setImage(null);
    setInfo({ title: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imageUrl = await addImage();

    try {
      const data = {
        title: info.title,
        description: info.description,
        imageUrl: imageUrl ? imageUrl : selectedPlaylist?.imageUrl,
      };

      if (selectedPlaylist) {
        const res = await updatePlaylist(selectedPlaylist._id, data);
        if (res.status === 200) {
          clearInputs();
          setSelectedPlaylist(res.data);
          setLoading(false);
          onClose(false);
        }
      } else {
        const res = await createPlaylist(data);
        if (res.status === 200) {
          alert("Playlist created successfully!");
          clearInputs();
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.status == 401) {
        alert("Unauthorized. Please log in again.");
        logoutAuth();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const addImage = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + image.name;
      formData.append("filename", filename);
      formData.append("file", image);

      const res = await uploadImage(formData);
      if (res.status === 200) {
        return filename;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="uplist">
      <div className={`wrapper ${state?.theme} container`}>
        <h2 className="heading">
          {selectedPlaylist && (
            <FaArrowLeft
              onClick={() => onClose(false)}
              style={{ marginRight: "1rem", cursor: "pointer" }}
            />
          )}
          {selectedPlaylist ? "Update Playlist" : "Create a New Playlist"}
        </h2>
        <form className="uplist-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={info.title}
            onChange={(e) => setInfo({ ...info, title: e.target.value })}
            placeholder="Title"
            required
          />
          <textarea
            value={info.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            placeholder="Description"
            required
          ></textarea>

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
              {image
                ? `${image.name}`
                : selectedPlaylist?.imageUrl
                ? selectedPlaylist.imageUrl
                : "Select image"}
            </div>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Please wait for a minute" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Uplist;
