import axios from "axios";
import { API_BASE_URL } from "@env";

const request = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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

export const uploadImage = (image) => {
  const formData = new FormData();
  formData.append("image", {
    uri: image.uri,
    name: image.name,
    type: image.type,
  });
  return request.post("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadAvatar = (avatar) => {
  const formData = new FormData();
  formData.append("avatar", {
    uri: avatar.uri,
    name: avatar.name,
    type: avatar.type,
  });
  return request.post("/upload/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadVideo = (video) => {
  const formData = new FormData();
  formData.append("video", {
    uri: video.uri,
    name: video.name,
    type: video.type,
  });
  return request.post("/upload/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadBanner = (banner) => {
  const formData = new FormData();
  formData.append("banner", {
    uri: banner.uri,
    name: banner.name,
    type: banner.type,
  });
  return request.post("/upload/banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAvatarUrl = (avatar) =>
  `${API_BASE_URL}/media/avatar/${avatar}`;
export const getBannerUrl = (banner) =>
  `${API_BASE_URL}/media/banner/${banner}`;
export const getImageUrl = (image) => `${API_BASE_URL}/media/image/${image}`;
export const getVideoUrl = (video) => `${API_BASE_URL}/media/video/${video}`;
