import express from "express";

import userController from "../controllers/user.controller";
// import "../controllers/user.controller";
import isAuthenticated from "../middleware/authenticator";
import { UpdateUserValidator } from "../utilities/validatorHandles/user.valid";

const userRouter = express.Router()

userRouter
    // get all users
    .get("", isAuthenticated, userController.getAllUsers)

    // get a single user: with handler(username) or ID
    .get("/:userId_username", userController.findOneUser)

    // update a user
    .put("/:userId", isAuthenticated, UpdateUserValidator, userController.update_A_User)

    // delete user
    .delete("/:userId", isAuthenticated, userController.delete_A_User)

    // get all posts belonging to a user: with handler(username) or ID
    .get("/:userId_username/postits")

    // get a particular post belonging to particular user: 
    .get("/:userId_username/postits/:postitId")

    // get all comments belonging to a post of a particular user: 
    .get("/:userId_username/postits/:postitId/comments")

    // get a particular comment belonging to a post of a particular user: 
    .get("/:userId_username/postits/:postitId/comments/:commentId")


export default userRouter;
