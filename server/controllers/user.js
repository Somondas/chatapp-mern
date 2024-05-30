// >> Create a user and save it to the database and also save cookie

import { User } from "../models/user.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "fkjasdklf",
    url: "fasdfasdf",
  };
  await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  res.status(200).json({ message: "User created Successfully" });
};

const login = (req, res) => {
  res.send("Heloa");
};

export { login, newUser };
