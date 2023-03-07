import express from "express";


const userRouter = express.Router()

// get all users: with handler(username) or ID
// get a single user
// update user
// delete user

// get all posts belonging to a user: with handler(username) or ID
//users/<userId>/posts

// get a particular post belonging to particular user: 
//users/<userId>/posts/<id>

// get all comments belonging to a post of a particular user: 
//users/<userId>/posts/<postId>/comments

// get a particular comment belonging to a post of a particular user: 
//users/<userId>/posts/<postId>/comments/id


export default userRouter;
