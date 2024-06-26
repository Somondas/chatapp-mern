import { userSocketIDs } from "../app.js";

export const getOtherMembers = (members, userId) => {
  return members.filter((member) => member._id.toString !== userId.toString());
};
export const getSockets = (users) => {
  const sockets = users.map((user) => userSocketIDs.get(user._id.toString()));
  return sockets;
};
