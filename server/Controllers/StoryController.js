import StoryModel from "../Models/storyModel.js";
import mongoose from "mongoose";

export const createStory = async (req, res) => {
  const { userId, image } = req.body;
  try {
    let userStory = await StoryModel.findOne({ userId });

    if (userStory) {
      userStory.stories.push({ image });
      await userStory.save();
      res.status(200).json(userStory);
    } else {
      const newStoryEntry = new StoryModel({
        userId,
        stories: [{ image }],
      });
      await newStoryEntry.save();
      res.status(200).json(newStoryEntry);
    }
  } catch (error) {
    console.error("Error creating story:", error);
    res.status(500).json(error);
  }
};

export const getStories = async (req, res) => {
  try {
    const stories = await StoryModel.aggregate([
      {
        $unwind: "$stories",
      },
      {
        $sort: { "stories.createdAt": -1 },
      },
      {
        $group: {
          _id: "$userId",
          stories: { $push: "$stories" },
        },
      },
      {
        $addFields: {
          userIdObjectId: { $toObjectId: "$_id" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObjectId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          stories: 1,
          firstname: "$userDetails.firstname",
          lastname: "$userDetails.lastname",
          profilePicture: "$userDetails.profilePicture",
        },
      },
      {
        $unset: "userIdObjectId",
      },
    ]);
    console.log("Aggregated stories fetched:", stories);
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json(error);
  }
};