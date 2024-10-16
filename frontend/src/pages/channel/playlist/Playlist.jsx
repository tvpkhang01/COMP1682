import { useParams } from "react-router-dom";
import "./Playlist.css";
import { useEffect, useState } from "react";
import { getPlaylist, getVideo, getImageUrl } from "../../../api/Api";

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(videos);

  useEffect(() => {
    loadPlaylistInfo(playlistId);
  }, [playlistId]);

  useEffect(() => {
    if (playlist?.videos?.length > 0) {
      loadPlaylistVideosInfo();
    }
  }, [playlistId, playlist]);

  const loadPlaylistInfo = async (playlistId) => {
    if (!playlistId) return;
    try {
      const res = await getPlaylist(playlistId);
      if (res.status == 200) {
        setPlaylist(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadPlaylistVideosInfo = async () => {
    try {
      const videoPromises = playlist.videos.map((videoId) => getVideo(videoId));
      const res = await Promise.all(videoPromises);
      setVideos(res.map((videoRes) => videoRes.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylistImage = () => {
    const firstVideo = videos.length > 0 ? videos[0] : null;
    return playlist?.imageUrl
      ? getImageUrl(playlist.imageUrl)
      : firstVideo?.imageUrl
      ? getImageUrl(firstVideo.imageUrl)
      : null;
  };

  return (
    <div className="playlist">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="playlist-wrapper">
          <h2>{playlist?.title}</h2>
          <div className="left">
            <div className="playlist-image">
              <img src={getPlaylistImage()} alt={playlist?.title} />
            </div>
            <div className="playlist-title">{playlist?.title}</div>
            <div className="playlist-description">{playlist?.description}</div>
          </div>
          <div className="right">
            <h3>Videos</h3>
            <div className="playlist-videos">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video._id} className="video-item">
                    <img src={getImageUrl(video.imageUrl)} alt={video.title} />
                    <div className="video-title">{video.title}</div>
                  </div>
                ))
              ) : (
                <div>No videos found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
