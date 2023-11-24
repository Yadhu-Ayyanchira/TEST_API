import express from "express";
const userRouter = express.Router();
import UsersController from "../Controllers/UsersController.js";

userRouter.post('/register',UsersController.register)
userRouter.post('/login',UsersController.login)

export default userRouter;
