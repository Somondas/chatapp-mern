import mongoose, { Schema, Types, model, models } from "mongoose";
// import { hash } from "bcrypt";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //
    groupChat: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = models.Chat || model("Chat", schema);
