import { useContext, useState } from "react";
import "./Uplist.css";
import AppContext from "../../context/AppContext";
import { createPlaylist, uploadImage } from "../../api/Api"; // Assuming you have an API function for creating a playlist
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";

const Uplist = () => {
  const { state, logoutAuth } = useContext(AppContext);
  const [info, setInfo] = useState({ title: "", description: "" });
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
        imageUrl: imageUrl || "",
      };
      const res = await createPlaylist(data);
      if (res.status === 200) {
        alert("Playlist created successfully!");
        clearInputs();
        navigate("/");
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
        <h2>Create a New Playlist</h2>
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
              {image ? `${image.name}` : <span>Select image</span>}
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
