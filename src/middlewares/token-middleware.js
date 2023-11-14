import jwt from "jsonwebtoken";
import "dotenv/config";
import { tokenModel } from "../db/models/token-model.js";
import {
  checkAccessToken,
  checkRefreshToken,
  issueToken,
} from "../modules/token-modules.js";

const refreshTokenMiddleware = async (req, res, next) => {
  const { authorization, refreshtoken } = req.headers;
  const { userId } = req.params;

  const accessToken = authorization.split(" ")[1];
  const refreshToken = refreshtoken;

  const accessTokenValid = await checkAccessToken(accessToken);

  if (accessTokenValid.ok) {
    next();
  } else {
    // access token이 만료되었고 refresh token이 없으면
    // 프론트에 refresh token 달라고 전달
    if (!accessTokenValid.ok && refreshToken === undefined) {
      return res.status(401).json(accessTokenValid);
    }

    const refreshTokenValid = await checkRefreshToken(userId, refreshToken);

    // refresh token이 만료되었으면 로그인창으로 가라고 전달
    if (!refreshTokenValid.ok) {
      return res.status(401).json(refreshTokenValid);
    }

    const tokens = await issueToken(userId);
    const newAccessToken = tokens.accessToken;
    const newRefreshToken = tokens.refreshToken;

    // refresh 토큰 업데이트
    await tokenModel.updateToken({
      _id: userId,
      refreshToken: newRefreshToken,
    });

    // res.status(201).json({ accessToken: newAccessToken });
    next();
  }
};

const tokenMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.split(" ")[1];

    const accessTokenValid = await checkAccessToken(accessToken);

    if (!accessTokenValid.ok) {
      return res.status(400).json({ message: "access token is denied" });
    }

    req.params = { ...req.params, userId: accessTokenValid.userId };
    next();

    // 위에 있는 코드로 변경
    // if (accessTokenValid.ok && Object.keys(req.params).length === 0) {
    //   req.params = { userId: accessTokenValid.userId };
    //   next();
    // } else if (accessTokenValid.ok) {
    //   next();
    // } else {
    //   return res.status(400).json({ message: "access token is denied" });
    // }
  } catch (error) {
    return res.status(400).json({ message: "access token is denied" });
  }
};

export { tokenMiddleware };
