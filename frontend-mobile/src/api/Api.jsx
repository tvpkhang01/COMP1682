import axios from "axios";
import queryString from "query-string";
import { API_BASE_URL } from "@env";

console.log(API_BASE_URL);

const application = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

// const applicationNoAuth = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "content-type": "application/json",
//   },
//   paramsSerializer: (params) => queryString.stringify(params),
//   withCredentials: true,
// });

const formData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "multipart/form-data",
  },
  withCredentials: true,
});

export const login = (params) => application.post("/auth/login", params);
export const logout = (params) => application.post("/auth/logout", params);
export const register = (params) => application.post("/auth/register", params);
export const checkToken = () => application.post("/auth/checkToken");

export const getChannels = () => application.get("/channel");
export const getChannel = (channelId) => application.get(`/channel/${channelId}`);
export const updateChannel = (channelId, params) => application.patch(`/channel/${channelId}`, params);
export const subscribeChannel = (channelId, params) => application.patch(`/channel/subscribe/${channelId}`, params);
export const unsubscribeChannel = (channelId, params) => application.patch(`/channel/unsubscribe/${channelId}`, params);
export const deleteChannel = (channelId) => application.delete(`/channel/${channelId}`);

export const getVideos = (search = "") => application.get(`/video${search}`);
export const getVideosByChannel = (channelId) => application.get(`/video/channel/${channelId}`);
export const getVideo = (videoId) => application.get(`/video/${videoId}`);
export const createVideo = (params) => formData.post("/video", params);
export const updateVideo = (videoId, params) => formData.patch(`/video/${videoId}`, params);
export const deleteVideo = (videoId) => application.delete(`/video/${videoId}`);
export const likeVideo = (videoId, params) => application.patch(`/video/like/${videoId}`, params);
export const dislikeVideo = (videoId, params) => application.patch(`/video/dislike/${videoId}`, params);

export const uploadImage = (image) => {
  const formDataData = new FormData();
  formDataData.append("image", {
    uri: image.uri,
    name: image.name,
    type: image.type,
  });
  return formData.post("/upload/image", formDataData);
};

export const uploadAvatar = (avatar) => {
  const formDataData = new FormData();
  formDataData.append("avatar", {
    uri: avatar.uri,
    name: avatar.name,
    type: avatar.type,
  });
  return formData.post("/upload/avatar", formDataData);
};

export const uploadVideo = (video) => {
  const formDataData = new FormData();
  formDataData.append("video", {
    uri: video.uri,
    name: video.name,
    type: video.type,
  });
  return formData.post("/upload/video", formDataData);
};

export const uploadBanner = (banner) => {
  const formDataData = new FormData();
  formDataData.append("banner", {
    uri: banner.uri,
    name: banner.name,
    type: banner.type,
  });
  return formData.post("/upload/banner", formDataData);
};

export const getAvatarUrl = (avatar) => `${API_BASE_URL}/media/avatar/${avatar}`;
export const getBannerUrl = (banner) => `${API_BASE_URL}/media/banner/${banner}`;
export const getImageUrl = (image) => `${API_BASE_URL}/media/image/${image}`;
export const getVideoUrl = (video) => `${API_BASE_URL}/media/video/${video}`;
