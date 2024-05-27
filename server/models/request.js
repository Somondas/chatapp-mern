import mongoose, { Schema, model, models } from "mongoose";
// import { hash } from "bcrypt";

const schema = new Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },

    sender: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Request = models.Request || model("Request", schema);
