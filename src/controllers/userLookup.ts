import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import userLookupService from "../services/userLookup.service";
import { IErrorObj } from "../interfaces/error.interface";
import { IUserQueryProps } from "../interfaces/user.interface";


const userQueryParamsHandler = (userId_username: string) => {
    let userQueryParameter: IUserQueryProps;

    /**
     * check if the params contains @ symbol, if true then paramter is a username
     * else then query is the userId
     */

    if (userId_username.includes("@")) {
        userQueryParameter = {
            queryType: "username", queryValue: userId_username.split("@")[1]
        }
    } else {
        userQueryParameter = {
            queryType: "id", queryValue: userId_username
        }
    }
    return userQueryParameter
}

class USER_LOOKUP_CONTROLLER {
    // get all postits of a user
    async getAllUsersPostits(req: Request, res: Response, next: NextFunction) {
        // get the request parameter
        const userId_username: string = req.params.userId_username;
        let userQueryParameter = userQueryParamsHandler(userId_username)

        try {
            const postits = await userLookupService.getAllUserPostit(userQueryParameter)
            postits ?
                res
                    .status(200)
                    .json({ data: postits, success: true })
                : res
                    .status(400)
                    .json({ message: "Postit not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // get one postit of a user
    async getOneUserPostit(req: Request, res: Response, next: NextFunction) {
        // get the request parameter
        const userId = req.params.userId;
        const postitId = req.params.postitId;

        try {
            const postit = await userLookupService.getOneUserPostit(userId, postitId)
            postit ?
                res
                    .status(200)
                    .json({ data: postit, success: true })
                : res
                    .status(400)
                    .json({ message: "Postit not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // get all comments of a user's postit
    async getUserPostitComments(req: Request, res: Response, next: NextFunction) {
        // get the request parameter
        const userId = req.params.userId;
        const postitId = req.params.postitId;

        try {
            const comments = await userLookupService.getUserPostitComments(userId, postitId)
            comments ?
                res
                    .status(200)
                    .json({ data: comments, success: true })
                : res
                    .status(400)
                    .json({ message: "Comment not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // get a single comment of a user's postit
    async getUserPostitComment(req: Request, res: Response, next: NextFunction) {
        // get the request parameter
        const userId = req.params.userId;
        const postitId = req.params.postitId;
        const commentId = req.params.commentId;

        try {
            const comments = await userLookupService
                .getUserPostitComment(userId, postitId, commentId)

            comments ?
                res
                    .status(200)
                    .json({ data: comments, success: true })
                : res
                    .status(400)
                    .json({ message: "Comment not found", success: false });
        } catch (err) {
            next(err)
        }
    };
}

export default new USER_LOOKUP_CONTROLLER();
