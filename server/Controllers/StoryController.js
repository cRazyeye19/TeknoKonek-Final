import StoryModel from "../Models/storyModel.js";
import mongoose from "mongoose";

// Create new Story
export const createStory = async (req, res) => {
  const newStory = new StoryModel(req.body);

  try {
    await newStory.save();
    res.status(200).json(newStory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all stories (for now, just a placeholder)
export const getStories = async (req, res) => {
  try {
    const stories = await StoryModel.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json(error);
  }
};