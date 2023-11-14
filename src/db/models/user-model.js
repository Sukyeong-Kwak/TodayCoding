import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

const User = model("users", userSchema);

class UserModel {
  async find(userInfo) {
    const result = await User.find(userInfo);
    return result;
  }
  // DB에 유저 추가
  async create(userInfo) {
    const result = await User.create(userInfo);
    return result;
  }

  // userId로 user 찾기
  async findByUserId(id) {
    const result = await User.findOne(id);
    return result;
  }

  async findById(id) {
    const result = await User.findById(id);
    return result;
  }

  // id로 user 찾고 삭제
  async deleteById(id) {
    const result = await User.findByIdAndDelete(id);
    return result;
  }

  async update(_id, toUpdate) {
    const updateInfo = await User.findByIdAndUpdate(_id, toUpdate, {
      returnOriginal: false,
    });
    return updateInfo;
  }

  // 유저 카테고리 추가(고정 카테고리)
  async addCategoryName(userId, categoryName) {
    const user = await User.findById(userId);
    const category = user.categoryName;

    category.push({ name: categoryName });
    const result = await user.save();

    return result.categoryName;
  }

  // 카테고리 삭제
  async deleteCategoryName(userId, categoryNameId) {
    const user = await User.findById(userId);

    const oldCategoryNames = user.categoryName;
    const newCategoryNames = oldCategoryNames.filter(
      (category) => category._id.toString() !== categoryNameId
    );

    user.categoryName = newCategoryNames;
    const result = await user.save();

    return result;
  }

  // 카테고리 수정
  async updateCategroyName(userId, categoryNameId, changedName) {
    const user = await User.findById(userId);

    const AllCategoryNames = user.categoryName;
    AllCategoryNames.forEach((category) => {
      if (category._id.toString() === categoryNameId) {
        category.name = changedName;
      }
    });

    user.categoryName = AllCategoryNames;
    const result = await user.save();

    return result.categoryName;
  }
}

const userModel = new UserModel();

export { userModel };
