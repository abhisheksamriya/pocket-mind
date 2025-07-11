import express from "express";
import { User } from "../models/db";
import { signupValidator } from "../middleware/signupValidator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { protect } from "../middleware/protect";
import { signinValidator } from "../middleware/signinValidator";

const router = express.Router();

router.post("/signup", signupValidator, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(403).json({ message: "Email already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "Signed Up",
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/signin", signinValidator, async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(403).json({ message: "user not exist" });
      return;
    }
    const verifyPassword = await bcrypt.compare(password, findUser?.password);
    if (!verifyPassword) {
      res.status(403).json({ message: "wrong password" });
      return;
    }
    const key = process.env.SECRET_KEY || "";
    const token = jwt.sign({ id: findUser._id }, key);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

router.get("/user", protect, async (req, res) => {
  const userId = (req as any).userId;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ id: user?._id, username: user?.username });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

router.delete("/signout/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

export default router;
