// >> Create a user and save it to the database and also save cookie

import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { Request } from "../models/request.js";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { getOtherMembers } from "../lib/helper.js";

// >> Regiser User Controller--------------------------------
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  // const avatar = {
  //   public_id: "fkjasdklf",
  //   url: "fasdfasdf",
  // };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  const file = req.file;
  // console.log(file);

  if (!file)
    return res.status(400).json({ message: "Please upload an Avatar" });
  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  // res.status(200).json({ message: "User created Successfully" });

  sendToken(res, user, 200, "User created Successfully");
};
// >> Login Controller--------------------------------
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});
// >> Get My Profile Controller----------------------------
const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) return next(new ErrorHandler("User not found", 404));
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

// >> Send Friend Request Controller---------------------------
const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) {
    return next(new ErrorHandler("Friend Request Already Send", 404));
  }
  await Request.create({
    sender: req.user,
    receiver: userId,
  });
  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend Request Sent Successfully",
  });
});

// >> Accept Friend Request Controller-------------------------
const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) {
    return next(new ErrorHandler("Friend Request not found", 404));
  }

  if (request.receiver._id.toString() !== req.user.toString()) {
    return next(
      new ErrorHandler("You are not authorized to accept this request", 400)
    );
  }
  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected",
    });
  }
  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);
  emitEvent(req, REFETCH_CHATS, members);
  // emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
});

// >> Get All Notification Controller--------------------------
const getMyNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({
    receiver: req.user,
  }).populate("sender", "name avatar");

  const allRequest = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));
  return res.status(200).json({
    success: true,
    allRequest,
  });
});
// >> Get My Friends Controller--------------------------
const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMembers(members, req.user);
    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,
      friends,
    });
  }
});

// -> All Exports----------------------------------------------
export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
};
