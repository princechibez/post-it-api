"use strict";
// get all posts
// get a single post
// update a post
// delete a post
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class USER_LOOKUP_SERVICE {
    // get all postits of a user
    getAllUserPostit(userCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userPostits;
                if (userCredential.queryType == "id") {
                    userPostits = yield models_1.Postit.find({ creator: userCredential.queryValue, deleted: false })
                        .select("-deleted")
                        .populate({ path: "creator", select: "username profilePicture" })
                        .lean()
                        .sort({ createdAt: -1 });
                }
                else if (userCredential.queryType == "username") {
                    userPostits = yield models_1.User.findOne({ username: userCredential.queryValue, deleted: false })
                        .select("posts")
                        .populate({
                        path: "posts",
                        // populate: { path: "creator" },
                        // select: "-deleted"
                    })
                        .lean()
                        .sort({ createdAt: -1 });
                }
                return userPostits;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // get all postits of a user
    getOneUserPostit(userId, postitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userPostit = yield models_1.Postit.findOne({ creator: userId, _id: postitId, deleted: false })
                    .select("-deleted")
                    .populate({ path: "creator", select: "username profilePicture profileImageTag" })
                    .lean();
                return userPostit;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // get all comments of a user's postit
    getUserPostitComments(userId, postitId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let comments = yield models_1.Comment.find({ commentator: userId, postId: postitId, deleted: false })
                    .select("-deleted")
                    .populate({ path: "commentator",
                    select: "username profilePicture profileImageTag" })
                    .lean();
                return comments;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // get a single comment of a user's postit
    getUserPostitComment(userId, postitId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let comment = yield models_1.Comment.findOne({ commentator: userId, postId: postitId, _id: commentId, deleted: false })
                    .select("-deleted")
                    .populate({
                    path: "commentator",
                    select: "username profilePicture profileImageTag"
                })
                    .lean();
                return comment;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new USER_LOOKUP_SERVICE();
