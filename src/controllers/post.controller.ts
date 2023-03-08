import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import PostServices from "../services/post.services";
import { Postit } from "../models";
import { IErrorObj } from "../interfaces/error.interface";
import postServices from "../services/post.services";

class POST_CONTROLLER {

    // create new postits
    async createPostit(req: Request, res: Response, next: NextFunction) {
        const postitData = req.body;

        try {
            // check for errors thrown from validators
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let error: IErrorObj = new Error(errors.array()[0].msg);
                error.statusCode = 400;
                throw error;
            }

            // create a new post...
            const newPost = await PostServices.createPostit(postitData)

            newPost ?
                res
                    .status(200)
                    .json({ message: "Post successfully created", data: newPost, success: true })
                : res
                    .status(400)
                    .json({ message: "An error occured", success: false });
        } catch (err) {
            next(err);
        }
    }

    // get all postits
    async getAllPostits(req: Request, res: Response, next: NextFunction) {
        try {
            const postits = await postServices.getAllPostit()
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

    // get one postit
    async findOnePostit(req: Request, res: Response, next: NextFunction) {
        const postitId = req.params.postitId
        try {
            const postit = await postServices.findOnePostit(postitId)
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

    // update a postit
    async update_A_Postit(req: Request, res: Response, next: NextFunction) {
        const postitId = req.params.postitId;
        const postitBody = req.body;
        try {
            // check for errors thrown from validators
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let error: IErrorObj = new Error(errors.array()[0].msg);
                error.statusCode = 400;
                throw error;
            }

            const updatedPostit = await postServices.updatePostit(postitId, postitBody)
            updatedPostit ?
                res
                    .status(200)
                    .json({ data: updatedPostit, success: true })
                : res
                    .status(400)
                    .json({ message: "Postit not found", success: false });
        } catch (err) {
            next(err)
        }
    };

    // delete a postit
    async delete_A_Postit(req: Request, res: Response, next: NextFunction) {
        const postitId = req.params.postitId;
        try {
            const deletePostit = await postServices.deletePostit(postitId);

            deletePostit ?
                res
                    .status(200)
                    .json({ message: "Postit successfully deleted", success: true })
                : res
                    .status(400)
                    .json({ message: "Postit not found", success: false });
        } catch (err) {
            next(err)
        }
    };
}

export default new POST_CONTROLLER();
