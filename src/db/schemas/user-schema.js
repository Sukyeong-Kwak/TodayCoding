import { Schema } from "mongoose";

const categoryNameSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const userSchema = new Schema(
  {
    // 유저 이름
    name: {
      type: String,
      required: true,
    },
    // 유저 ID
    id: {
      type: String,
      unique: true,
      required: true,
    },
    // 유저 이메일
    email: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: false,
    },
    birthDate: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    // 유저 비밀번호 (해쉬)
    password: {
      type: String,
      required: true,
    },
    // 프로필 사진
    profileImgUrl: {
      type: String,
      required: false,
    },
    // admin 확인
    isAdmin: {
      type: Boolean,
      default: false,
    },
    categoryName: [categoryNameSchema],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { userSchema };
