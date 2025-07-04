import express from "express";
import { Content } from "../models/db";
import { protect } from "../middleware/protect";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { type, link, title, hint } = req.body;
  const userId = (req as any).userId;
  if (!type || !link || !title || !hint) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    await Content.create({ type, link, title, hint, userId });
    res.status(200).json({ message: "content is created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const contents = await Content.find({ userId });
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const contentId = req.params.id;
    const content = await Content.findOne({ _id: contentId, userId });
    if (!content) {
      res.status(404).json({ message: "Content not found" });
      return;
    }

    await Content.deleteOne({ _id: contentId });
    res.status(200).json({ message: "successfull deleted" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

export default router;
