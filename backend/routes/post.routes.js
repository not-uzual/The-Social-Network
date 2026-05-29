import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { fetchAllPosts, fetchFollowingPosts } from '../controllers/post.controllers.js';

const postRouter = express.Router();

postRouter.get('/all', fetchAllPosts);
postRouter.get('/following', isAuth, fetchFollowingPosts);

export default postRouter;
