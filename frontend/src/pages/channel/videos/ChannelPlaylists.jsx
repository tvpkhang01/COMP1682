import { useEffect, useState } from "react";
import PlaylistCard from "../../../components/videoItem/playlistCard/PlaylistCard";
import { getPlaylistsByChannel } from "../../../api/Api";

// eslint-disable-next-line react/prop-types
const ChannelPlaylists = ({ channelId }) => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    loadPlaylistsByChannelId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  const loadPlaylistsByChannelId = async () => {
    if (!channelId) return;
    try {
      const res = await getPlaylistsByChannel(channelId);
      if (res.status === 200) {
        setPlaylists(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-items">
      {playlists.length > 0
        ? playlists.map((playlist, index) => (
            <PlaylistCard key={index} playlist={playlist} />
          ))
        : "No playlists found"}
    </div>
  );
};

export default ChannelPlaylists;
