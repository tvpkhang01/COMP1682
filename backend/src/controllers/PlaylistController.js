const Channel = require("../models/Channel");
const Playlist = require("../models/Playlist");
const Video = require("../models/Video");

const getPlaylistsByChannelId = async (req, res, next) => {
  const channelId = req.params.channelId;
  try {
    const playlists = await Playlist.find({ channelId });
    const l_playlists = await fetchChannelInfos(playlists);
    if (playlists && playlists.length > 0) {
      res.status(200).json(l_playlists);
    } else {
      res.status(404).json("No playlists record found");
    }
  } catch (error) {
    next(error);
  }
};

const getPlaylist = async (req, res, next) => {
  const playlistId = req.params.id;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json("Playlist not found");

    const l_channel = await Channel.findById(
      playlist.channelId,
      "name avatarUrl subscribers"
    ).exec();

    if (l_channel) {
      const { _id, ...channel } = l_channel._doc;
      res.status(200).json({ ...playlist._doc, ...channel });
    } else {
      res.status(404).json("Channel not found");
    }
  } catch (error) {
    next(error);
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const l_playlist = new Playlist({
      channelId: req.channel.id,
      ...req.body,
    });
    const savedPlaylist = await l_playlist.save();
    const l_channel = await Channel.findById(savedPlaylist.channelId);

    if (!l_channel) {
      return res.status(404).json("Channel not found");
    }

    await l_channel.updateOne({
      $push: { playlists: savedPlaylist._id.toString() },
    });
    const channel = {
      name: l_channel.name,
      avatarUrl: l_channel.avatarUrl,
      subscribers: l_channel.subscribers,
    };

    res.status(200).json({ ...savedPlaylist._doc, ...channel });
  } catch (error) {
    next(error);
  }
};

const updatePlaylist = async (req, res, next) => {
  try {
    const l_playlist = await Playlist.findById(req.params.id);
    if (!l_playlist) return res.status(404).json("Playlist not found");
    if (req.channel.id === l_playlist.channelId) {
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const l_channel = await Channel.findById(
        l_playlist.channelId,
        "name avatarUrl subscribers"
      ).exec();

      if (!l_channel) {
        return res.status(404).json("Channel not found");
      }

      const { _id, ...channel } = l_channel._doc;
      res.status(200).json({ ...updatedPlaylist._doc, ...channel });
    } else {
      return res
        .status(403)
        .json("Updating playlists from other channels is not allowed.");
    }
  } catch (error) {
    next(error);
  }
};

const deletePlaylist = async (req, res, next) => {
  try {
    const l_playlist = await Playlist.findById(req.params.id);
    if (!l_playlist) return res.status(404).json("Playlist not found");
    if (req.channel.id === l_playlist.channelId) {
      const l_channel = await Channel.findById(l_playlist.channelId);
      if (l_channel.playlists.includes(l_playlist._id.toString())) {
        await l_channel.updateOne({
          $pull: { playlists: l_playlist._id.toString() },
        });
      }
      await l_playlist.deleteOne();
      res.status(200).json("Playlist has been deleted.");
    } else {
      return res
        .status(403)
        .json("Deleting playlists from other channels is not allowed.");
    }
  } catch (error) {
    next(error);
  }
};

const insertVideo = async (req, res, next) => {
  try {
    const l_playlist = await Playlist.findById(req.params.id);
    if (!l_playlist) return res.status(404).json("Playlist not found");

    if (req.channel.id === l_playlist.channelId) {
      if (!l_playlist.videos.includes(req.params.videoId)) {
        const l_video = await Video.findById(req.params.videoId);
        await l_playlist.updateOne({
          $push: {
            videos: l_video._id.toString(),
          },
        });
        await l_video.updateOne({
          $push: { playlists: l_playlist._id.toString() },
        });
        res.status(200).json("Video added to playlist.");
      } else {
        res.status(400).json("Video already in playlist.");
      }
    } else {
      res.status(403).json("You can only add videos to your own playlists.");
    }
  } catch (error) {
    next(error);
  }
};

const removeVideo = async (req, res, next) => {
  try {
    const l_playlist = await Playlist.findById(req.params.id);

    if (!l_playlist) return res.status(404).json("Playlist not found");
    if (req.channel.id === l_playlist.channelId) {
      if (l_playlist.videos.includes(req.params.videoId)) {
        const l_video = await Video.findById(req.params.videoId);
        await l_playlist.updateOne({
          $pull: { videos: l_video._id.toString() },
        });
        await l_video.updateOne({
          $pull: { playlists: l_playlist._id.toString() },
        });
        res.status(200).json("Video removed from playlist.");
      } else {
        res.status(400).json("Video not found in playlist.");
      }
    } else {
      res
        .status(403)
        .json("You can only remove videos from your own playlists.");
    }
  } catch (error) {
    next(error);
  }
};

const fetchChannelInfos = async (playlists) => {
  let results = [];

  if (playlists.length === 0) return results;

  for (const playlist of playlists) {
    const l_channel = await Channel.findById(
      playlist.channelId,
      "name avatarUrl subscribers"
    ).exec();

    if (l_channel) {
      const { _id, ...channel } = l_channel._doc;
      results.push({ ...playlist._doc, ...channel });
    }
  }

  return results;
};
module.exports = {
  getPlaylistsByChannelId,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  insertVideo,
  removeVideo,
};
