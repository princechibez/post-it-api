// get all posts
// get a single post
// update a post
// delete a post

import { User } from "../models";
import { IUser, IUserQueryProps } from "../interfaces/user.interface";

class POST_MANAGER {
  // get all users
  async getAllUsers() {
    try {
      return await User.find({ deleted: false })
        .select("-password -deleted")
        .lean()
        .sort({ createdAt: -1 })
    } catch (err) {
      throw err;
    }
  }

  // find one user
  async findOneUser(userCredential: IUserQueryProps) {
    try {
      return await User.findOne({
        $and: [
          userCredential.queryType == "id" ?
            { _id: userCredential.queryValue } : { username: userCredential.queryValue },
          { deleted: false }
        ]
      })
        .select("-password -deleted")
        .lean();
    } catch (err) {
      throw err;
    }
  }

  // Update a user
  async updateUser(id: string, newData: Partial<IUser>) {
    try {
      return await User.findOneAndUpdate(
        { $and: [{ _id: id }, { deleted: false }] }, newData, { new: true }
      ).select("-password -deleted")
    } catch (err) {
      throw err;
    }
  }

  // Method for deleting a user
  async deleteUser(id: string) {
    try {
      // Apply soft delete on this user
      return await User.findOneAndUpdate({ _id: id }, { deleted: true }, { new: true })
        .select("-password -deleted")
    } catch (err) {
      throw err;
    }
  }
}

export default new POST_MANAGER();
