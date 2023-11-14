import jwt from "jsonwebtoken";
import "dotenv/config";
import { tokenModel } from "../db/models/token-model.js";

const checkAccessToken = (accessToken) => {
  try {
    const key = process.env.KEY;
    const accessInfo = jwt.verify(accessToken, key);

    return {
      ok: true,
      userId: accessInfo.userId,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      message: "access token denied",
    };
  }
};

const checkRefreshToken = async (id, refreshToken) => {
  try {
    const userRefreshToken = await tokenModel.findById(id);
    if (!refreshToken === userRefreshToken.refreshToken) {
      return {
        ok: false,
        message: "refresh token is changed",
      };
    }
    return { ok: refreshToken === userRefreshToken.refreshToken };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      message: "refresh token is expired / login again",
    };
  }
};

const issueToken = async (userId) => {
  const key = process.env.KEY;
  const accessToken = jwt.sign({ userId }, key, { expiresIn: "90d" });
  const refreshToken = jwt.sign({}, key, { expiresIn: "14d" });

  return { accessToken, refreshToken };
};

export { checkAccessToken, checkRefreshToken, issueToken };
