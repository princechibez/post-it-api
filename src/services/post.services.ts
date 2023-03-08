// get all posts
// get a single post
// update a post
// delete a post

import { Postit } from "../models";
import { IPostit } from "../interfaces/post.interface";

class POST_MANAGER {

  // create a postit
  async createPostit(postData: IPostit) {
    try {
      const newPost = new Postit({
        ...postData,
      });
      return await newPost.save();
    } catch (err) {
      throw err;
    }
  }

  // get all postits
  async getAllPostit() {
    try {
      return await Postit.find({ deleted: false })
        .select("-deleted")
        .lean()
        .sort({ createdAt: -1 })
    } catch (err) {
      throw err;
    }
  }

  // find one postit
  async findOnePostit(id: string) {
    try {
      return await Postit.findOne({ $and: [{ _id: id }, { deleted: false }] })
      .select("-deleted")
        .lean();
    } catch (err) {
      throw err;
    }
  }

  // Update a postit
  async updatePostit(id: string, newData: Partial<IPostit>) {
    try {
      return await Postit.findOneAndUpdate(
        { $and: [{ _id: id }, { deleted: false }] }, newData, { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  // // Method for deleting room
  async deletePostit(id: string) {
    try {
      // Apply soft delete on this postit
      return await Postit.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true });
    } catch (err) {
      throw err;
    }
  }
}

export default new POST_MANAGER();
