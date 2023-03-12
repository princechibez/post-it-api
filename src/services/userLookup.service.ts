// get all posts
// get a single post
// update a post
// delete a post

import { Comment, Postit, User } from "../models";
import { IPostit } from "../interfaces/post.interface";
import { IErrorObj } from "../interfaces/error.interface";
import { IUserQueryProps } from "../interfaces/user.interface";

class USER_LOOKUP_SERVICE {

    // get all postits of a user
    async getAllUserPostit(userCredential: IUserQueryProps) {
        try {
            let userPostits;
            if (userCredential.queryType == "id") {
                userPostits = await Postit.find({ creator: userCredential.queryValue, deleted: false })
                    .select("-deleted")
                    .populate({ path: "creator", select: "username profilePicture" })
                    .lean()
                    .sort({ createdAt: -1 })
            } else if (userCredential.queryType == "username") {
                userPostits = await User.findOne({ username: userCredential.queryValue, deleted: false })
                    .select("posts")
                    .populate({
                        path: "posts",
                        // populate: { path: "creator" },
                        // select: "-deleted"
                    })
                    .lean()
                    .sort({ createdAt: -1 })
            }
            return userPostits
        } catch (err) {
            throw err;
        }
    }

    // get all postits of a user
    async getOneUserPostit(userId: string, postitId: string) {
        try {
            let userPostit = await Postit.findOne(
                { creator: userId, _id: postitId, deleted: false }
            )
                .select("-deleted")
                .populate({ path: "creator", select: "username profilePicture profileImageTag" })
                .lean()

            return userPostit
        } catch (err) {
            throw err;
        }
    }
    
    // get all comments of a user's postit
    async getUserPostitComments(userId: string, postitId: string) {
        try {
            let comments = await Comment.find(
                { commentator: userId, postId: postitId, deleted: false }
            )
                .select("-deleted")
                .populate({ path: "commentator",
                 select: "username profilePicture profileImageTag" })
                .lean()

            return comments
        } catch (err) {
            throw err;
        }
    }

    // get a single comment of a user's postit
    async getUserPostitComment(userId: string, postitId: string, commentId: string) {
        try {
            let comment = await Comment.findOne(
                { commentator: userId, postId: postitId, _id: commentId, deleted: false }
            )
                .select("-deleted")
                .populate({
                    path: "commentator",
                    select: "username profilePicture profileImageTag"
                })
                .lean()

            return comment
        } catch (err) {
            throw err;
        }
    }
}

export default new USER_LOOKUP_SERVICE();
