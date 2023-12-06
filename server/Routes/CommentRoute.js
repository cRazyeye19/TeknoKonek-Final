import express from "express";
const router = express.Router()
import { createComment, getComment } from "../Controllers/CommentController.js";

router.post('/')