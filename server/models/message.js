import mongoose, { Schema, Types, model, models } from "mongoose";
// import { hash } from "bcrypt";

const schema = new Schema(
  {
    content: String,
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sender: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = models.Message || model("Message", schema);
