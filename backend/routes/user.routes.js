import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { getUserProfile, getAllUsers } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.get('/current', isAuth, getUserProfile);
userRouter.get('/all', isAuth, getAllUsers);

export default userRouter;