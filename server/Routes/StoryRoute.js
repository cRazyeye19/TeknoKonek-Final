import express from "express";
import { createStory, getStories, getStory } from "../Controllers/StoryController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.post("/", authMiddleWare, createStory);
router.get("/", authMiddleWare, getStories);
router.get("/:id", authMiddleWare, getStory);

export default router;