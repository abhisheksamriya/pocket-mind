import express from "express";
import { protect } from "../middleware/protect";
import { Content, Link, User } from "../modules/db";
import crypto from "crypto";

const router = express.Router();

router.post("/share", protect, async (req, res) => {
  const { share } = req.body;
  const userId = req.body.userId; // Ideally, protect middleware se set hona chahiye

  try {
    const existingLink = await Link.findOne({ userId });

    if (share) {
      if (existingLink) {
        res.json({ hash: existingLink.hash });
        return;
      }
      const hash = crypto.randomBytes(16).toString("hex");
      await Link.create({ hash, userId });
      res.json({ hash });
      return;
    } else {
      if (existingLink) {
        await Link.deleteOne({ userId });
      }
      res.json({ message: "Link deleted" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;
    const link = await Link.findOne({ hash });
    if (!link) {
      res.status(404).json({ message: "Invalid share link" });
      return;
    }

    const content = await Content.find({ userId: link.userId });
    const user = await User.findOne({ _id: link.userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      username: user.username,
      content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
