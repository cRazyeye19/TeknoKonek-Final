import express from "express";
import { createStory, getStories } from "../Controllers/StoryController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.post("/", authMiddleWare, createStory);
router.get("/", authMiddleWare, getStories); // Placeholder for getting stories

export default router;