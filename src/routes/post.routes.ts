import express from "express";
import postController from "../controllers/post.controller";
import { CreatePostValidator, UpdatePostValidator } from "../utilities/validatorHandles/posts.valid";
import isAuthenticated from "../middleware/authenticator";


const postRouter = express.Router()

postRouter
    // create post
    .post("", isAuthenticated, CreatePostValidator, postController.createPostit)
    // get all posts
    .get("", postController.getAllPostits)
    // get a single post
    .get("/:postitId", postController.findOnePostit)
    // update a post
    .put("/:postitId", isAuthenticated, UpdatePostValidator, postController.update_A_Postit)
    // delete a post
    .delete("/:postitId", isAuthenticated, postController.delete_A_Postit)

export default postRouter;
