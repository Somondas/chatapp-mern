// >> Create a user and save it to the database and also save cookie

import { User } from "../models/user";

const newUser = async (req, res) => {
  const avatar = {
    public_id: "fkjasdklf",
    url: "fasdfasdf",
  };
  await User.create({
    name: "Name",
    username: "username",
    password: "password",
    avatar,
  });
};

const login = (req, res) => {
  res.send("Heloa");
};

export { login, newUser };
