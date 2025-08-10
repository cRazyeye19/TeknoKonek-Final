import express from "express";
import { createStory, getStories, getStory, getStoriesByUserId } from "../Controllers/StoryController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.post("/", authMiddleWare, createStory);
router.get("/", authMiddleWare, getStories);
router.get("/:id", authMiddleWare, getStory);
router.get("/user/:id", authMiddleWare, getStoriesByUserId);

export default router;