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

export const getStory = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid story ID format" });
  }

  try {
    const story = await StoryModel.aggregate([
      {
        $unwind: "$stories",
      },
      {
        $match: {
          "stories._id": mongoose.Types.ObjectId.createFromHexString(id),
        },
      },
      {
        $addFields: {
          userIdObjectId: { $toObjectId: "$userId" },
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
          userIdObjectId: 0, // Remove the temporary field
        },
      },
    ]);

    if (story.length > 0) {
      res.status(200).json(story[0]);
    } else {
      res.status(404).json({ error: "Story not found" });
    }
  } catch (error) {
    console.error("Error fetching single story:", error);
    res.status(500).json(error);
  }
};