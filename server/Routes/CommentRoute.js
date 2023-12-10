import express from "express";
import { createComment, getComments } from "../Controllers/CommentController.js";
const router = express.Router();

router.post('/', createComment)
router.get('/:id/comments', getComments)

export default router