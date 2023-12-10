import express from "express";
import { deleteUser, followUser, getAllUsers, getUser, searchUser, unfollowUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleware.js";
const router = express.Router();

router.get('/', getAllUsers)
router.get('/search', searchUser)
router.get('/:id', getUser)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow',authMiddleWare, unfollowUser)

export default router
