import express from "express";
import { deleteUser, followUser, getUser, searchUser, unfollowUser, updateUser } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/search', searchUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)

export default router