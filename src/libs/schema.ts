import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    level: {
      type: String,
      enum: ["Free", "Subscribe"],
      default: "Free",
    },
    // 소셜 로그인
    authProviderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
