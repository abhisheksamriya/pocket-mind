import express from "express";
import { User } from "../modules/db";
import { userAuth } from "../middleware/userAuth";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", userAuth, async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res
        .status(403)
        .json({ message: "user already exist with this username" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "Signed Up",
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/signin", userAuth, async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      res.status(403).json({ message: "username not exist" });
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

router.delete("/signout/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id);
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
