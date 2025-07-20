import mongoose from "mongoose";

const StorySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24,
    },
  },
  { timestamps: true }
);

const StoryModel = mongoose.model("Stories", StorySchema);
export default StoryModel;
