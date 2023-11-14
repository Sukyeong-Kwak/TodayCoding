import { userModel } from "../db/models/user-model.js";
import { issueToken } from "../modules/token-modules.js";
import { deleteImg } from "../modules/image-modules.js";
import bcrypt from "bcrypt";
import "dotenv/config";

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import "dotenv/config";

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

const UserService = {
  // 비밀번호만 암호화하여 DB에 회원 추가
  async addUser(userInfo) {
    const { name, id, email, password, nickname, aboutMe, birthDate, gender } =
      userInfo;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      name,
      id,
      email,
      password: hashedPassword,
      nickname,
      aboutMe,
      birthDate,
      gender,
    });

    return {
      success: !!result,
      name: result.name,
      id: result.id,
      email: result.email,
      nickname: result.nickname,
      aboutMe: result.aboutMe,
      birthDate: result.birthDate,
      gender: result.gender,
      profileImgUrl: result.profileIgUrl,
    };
  },

  async giveToken(userInfo) {
    const { id, password } = userInfo;

    const user = await userModel.findByUserId({ id });

    if (!user) {
      throw new Error("check id");
    }

    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      throw new Error("check password");
    }

    // token 생성
    const _id = user._id;
    const { accessToken, refreshToken } = await issueToken(_id);

    // refreshToken DB에 저장
    // const tokenData = await tokenModel.findById(_id);

    // if (!tokenData) {
    //   await tokenModel.createToken({
    //     id: _id,
    //     refreshToken,
    //   });
    // }
    // const result = await tokenModel.updateToken({ _id, refreshToken });

    return { accessToken };
  },

  async updateUserInfo(_id, toUpdate) {
    const user = await userModel.findById(_id);

    if (toUpdate.profileImgUrl && user.profileImgUrl) {
      const currentImageUrl = user.profileImgUrl.slice(52);
      deleteImg(currentImageUrl);
    }

    const result = await userModel.update(_id, toUpdate);

    return {
      name: result.name,
      id: result.id,
      email: result.email,
      nickname: result.nickname,
      aboutMe: result.aboutMe,
      birthDate: result.birthDate,
      gender: result.gender,
      profileImgUrl: result.profileImgUrl,
    };
  },

  async deleteAllDataByUserId(userId) {
    // 이미지 삭제
    const user = await userModel.findById(userId);

    if (user.profileImgUrl) {
      const currentImageUrl = user.profileImgUrl.slice(52);
      deleteImg(currentImageUrl);
    }

    // user 정보 삭제
    const result = await userModel.deleteById(userId);

    return result;
  },
};

export { UserService };
