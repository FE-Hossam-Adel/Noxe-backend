
import express from "express";
import { addUser , loginUser, verifyByOtp } from "../controllers/user.controller.js";
import { signUpValidator } from "../utils/validators/user.validator.js";

const userRouter = express.Router();


userRouter.post('/signup',signUpValidator,addUser);
userRouter.post('/verify',verifyByOtp);
userRouter.post('/login',loginUser);



export default userRouter;