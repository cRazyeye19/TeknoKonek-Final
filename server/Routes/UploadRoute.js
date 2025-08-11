import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded.");
    }

    const dataUri = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "auto",
    });

    return res.status(200).json(result.secure_url);
  } catch (error) {
    console.error("Error during file upload:", error);
    return res.status(500).json("File upload failed.");
  }
});

export default router;
