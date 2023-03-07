import mongoose, { model, Schema } from "mongoose";
import { SCHEMAS } from "../utilities/constants";

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

userSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "creator"
})

export default model(SCHEMAS.USER_SCHEMA, userSchema)