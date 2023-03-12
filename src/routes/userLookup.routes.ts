import express from "express";

import userLookupController from "../controllers/userLookup";

const userLookupRoutes = express.Router()

userLookupRoutes
    // get all posts belonging to a user: with handler(username) or ID
    .get("/:userId_username/postits", userLookupController.getAllUsersPostits)

    // get a particular post belonging to particular user: 
    .get("/:userId/postits/:postitId", userLookupController.getOneUserPostit)

    // get all comments belonging to a post of a particular user: 
    .get("/:userId/postits/:postitId/comments", userLookupController.getUserPostitComments)

    // get a particular comment belonging to a post of a particular user: 
    .get("/:userId/postits/:postitId/comments/:commentId", userLookupController.getUserPostitComment)


export default userLookupRoutes;
