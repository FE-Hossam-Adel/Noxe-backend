
import express from "express";
import userRouter from "./user.routes.js";

const indexrRouter = express.Router();



indexrRouter.use('/auth',userRouter)



export default indexrRouter;