// >> Create a user and save it to the database and also save cookie

import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

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
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
};

export { login, newUser };
