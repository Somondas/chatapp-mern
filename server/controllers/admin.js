import { TryCatch } from "../middlewares/error";
import { User } from "../models/user";

// >> Get All Users Controller---------------------------------
const allUsers = TryCatch(async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    users,
  });
});

// -> All Exports==============================================
export { allUsers };
