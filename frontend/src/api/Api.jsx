import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({ baseURL, withCredentials: true });

export const login = (params) => request.post("/auth/login", params);
export const logout = (params) => request.post("/auth/logout", params);
export const register = (params) => request.post("/auth/register", params);
export const checkToken = () => request.post("/auth/checkToken");

export const getChannels = () => request.get("/channel");
export const getChannel = (channelId) => request.get(`channel/${channelId}`);
export const updateChannel = (channelId, params) =>
  request.patch(`channel/${channelId}`, params);
export const subscribeChannel = (channelId, params) =>
  request.patch(`channel/subscribe/${channelId}`, params);
export const unsubscribeChannel = (channelId, params) =>
  request.patch(`channel/unsubscribe/${channelId}`, params);
export const deleteChannel = (channelId) =>
  request.delete(`/channel/${channelId}`);

export const getVideos = (search = "") => request.get(`/video${search}`);
export const getVideosByChannel = (channelId) =>
  request.get(`/video/channel/${channelId}`);
export const getVideo = (videoId) => request.get(`/video/${videoId}`);
export const createVideo = (params) => request.post("/video", params);
export const updateVideo = (videoId, params) =>
  request.patch(`/video/${videoId}`, params);
export const deleteVideo = (videoId) => request.delete(`/video/${videoId}`);
export const likeVideo = (videoId, params) =>
  request.patch(`/video/like/${videoId}`, params);
export const dislikeVideo = (videoId, params) =>
  request.patch(`/video/dislike/${videoId}`, params);

export const getPlaylistsByChannel = (channelId) =>
  request.get(`/playlist/channel/${channelId}`);
export const getPlaylist = (playlistId) =>
  request.get(`/playlist/${playlistId}`);
export const createPlaylist = (params) => request.post("/playlist", params);
export const updatePlaylist = (playlistId, params) =>
  request.patch(`/playlist/${playlistId}`, params);
export const deletePlaylist = (playlistId) =>
  request.delete(`/playlist/${playlistId}`);
export const insertVideoIntoPlaylist = (playlistId, videoId) =>
  request.patch(`/playlist/${playlistId}/insert/${videoId}`);
export const removeVideoFromPlaylist = (playlistId, videoId) =>
  request.patch(`/playlist/${playlistId}/remove/${videoId}`);

export const uploadImage = (image) => request.post("/upload/image", image);
export const uploadAvatar = (avatar) => request.post("/upload/avatar", avatar);
export const uploadVideo = (video) => request.post("/upload/video", video);
export const uploadBanner = (banner) => request.post("/upload/banner", banner);

export const getAvatarUrl = (avatar) => {
  return `${baseURL}/media/avatar/${avatar}`;
};
export const getBannerUrl = (banner) => {
  return `${baseURL}/media/banner/${banner}`;
};
export const getImageUrl = (image) => {
  return `${baseURL}/media/image/${image}`;
};
export const getVideoUrl = (video) => {
  return `${baseURL}/media/video/${video}`;
};
