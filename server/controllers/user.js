// >> Create a user and save it to the database and also save cookie

import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// >> Regiser User Controller--------------------------------
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "fkjasdklf",
    url: "fasdfasdf",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  // res.status(200).json({ message: "User created Successfully" });

  sendToken(res, user, 200, "User created Successfully");
};
// >> Login Controller--------------------------------
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 404));
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 404));
  }
  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});
// >> Get My Profile Controller----------------------------
// const getMyProfile = TryCatch(async (req, res, next) => {});
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

// >> Logout Controller------------------------------------
const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "User Logged Out Successfully",
    });
});
// >> Search User Controller-----------------------------------
const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  const myChats = await User.find({ groupChat: false, members: req.user });
  // All Users from my chats means friends or people I have chatted with
  const allUsersFromChats = myChats.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    allUsersExceptMeAndFriends,
  });
});
const sendRequest = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  const myChats = await User.find({ groupChat: false, members: req.user });
  // All Users from my chats means friends or people I have chatted with
  const allUsersFromChats = myChats.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    allUsersExceptMeAndFriends,
  });
});

// -> All Exports----------------------------------------------
export { login, newUser, getMyProfile, logout, searchUser, sendRequest };
