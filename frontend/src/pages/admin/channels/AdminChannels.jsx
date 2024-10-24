import "./AdminChannels.css";
import { useState, useEffect } from "react";
import { getChannels, getImageUrl, deleteChannel } from "../../../api/Api";
import { FaTrashAlt } from "react-icons/fa";

const Channels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      const res = await getChannels();
      if (res?.data) {
        setChannels(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (channelId) => {
    if (!channelId) return;
    console.log(channelId);
    try {
      if (window.confirm("Are you sure you want to delete")) {
        const res = await deleteChannel(channelId);
        if (res.status == 200) {
          alert("Channel is deleted");
          loadChannels();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-channels-container">
      {channels.length > 0 ? (
        channels.map((item, index) => (
          <div key={index} className="admin-channel-card">
            <img src={getImageUrl(item.imageUrl)} alt="Video cover" />
            <div className="admin-channel-info">
              <h2>{item.title}</h2>
              <h3>{item.name}</h3>
              <h3>{item.category}</h3>
            </div>
            <FaTrashAlt
              className="admin-channel-trash-icon"
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

export default Channels;
