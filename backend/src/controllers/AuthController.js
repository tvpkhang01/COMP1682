const Channel = require("../models/Channel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    const l_channel = new Channel({ ...req.body, password: hashPassword });
    await l_channel.save();

    res.status(201).json({ message: "Channel created successfully!" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const name = req.body.name;
  try {
    const l_channel = await Channel.findOne({
      $or: [{ name: name }],
    });
    if (!l_channel) return res.status(404).json("Channel not found");

    const l_passwordCheck = await bcrypt.compare(
      req.body.password,
      l_channel.password
    );
    if (!l_passwordCheck)
      return res.status(401).json("Wrong username or password");

    const accessToken = jwt.sign(
      { id: l_channel._id, admin: l_channel.admin },
      process.env.SECRET_JWT,
      { expiresIn: "1h" }
    );

    res
      .cookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        id: l_channel._id,
        name: l_channel.name,
        avatarUrl: l_channel.avatarUrl,
        admin: l_channel.admin,
      });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    res
      .cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

const checkToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(200).json("No token check");
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, checkToken };
