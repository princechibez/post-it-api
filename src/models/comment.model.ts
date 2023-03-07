import mongoose, { model, Schema } from "mongoose";
import { SCHEMAS } from "../utilities/constants";

const commentSchema = new Schema(
    {
        text: {
            type: String,
            minlength: [3, 'Must be three characters long'],
            required: [true, 'Text is required']
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },

    },
    {
        timestamps: true
    }
);

export default model(SCHEMAS.COMMENT_SCHEMA, commentSchema)