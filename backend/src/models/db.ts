import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, uniquie: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentTypes = ["twitter", "youtube", "linkedin", "instagram", "other"]; // Extend as needed

const contentSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    hint: { type: String, default: "for work" },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Link = mongoose.model("Link", linkSchema);
