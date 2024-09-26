import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({ baseURL, withCredentials: true });

export const login = (params) => request.post("/auth/login", params);
export const register = (params) => request.post("/auth/register", params);

export const getChannel = (channelId) => request.get(`channel/${channelId}`);
export const updateChannel = (channelId, params) =>
  request.patch(`channel/${channelId}`, params);
export const subscribeChannel = (channelId, params) =>
  request.patch(`channel/subscribe/${channelId}`, params);
export const unsubscribeChannel = (channelId, params) =>
  request.patch(`channel/unsubscribe/${channelId}`, params);

export const getVideos = () => request.get("/video");
export const getVideo = (videoId) => request.get(`/video/${videoId}`);
export const getVideoByChannel = (channelId) =>
  request.get(`/video/channel/${channelId}`);
export const createVideo = (params) => request.post("/video", params);
export const updateVideo = (videoId, params) =>
  request.patch(`/video/${videoId}`, params);
export const deleteVideo = (videoId) => request.delete(`/video/${videoId}`);
export const likeVideo = (videoId, params) =>
  request.patch(`/video/like/${videoId}`, params);
export const dislikeVideo = (videoId, params) =>
  request.patch(`/video/dislike/${videoId}`, params);

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
  return `${baseURL}/medias/video/${video}`;
};
