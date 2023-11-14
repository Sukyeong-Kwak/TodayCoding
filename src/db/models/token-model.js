import { model } from "mongoose";
import { tokenSchema } from "../schemas/token-schema.js";

const Token = model("tokens", tokenSchema);

class TokenModel {
  async findById(id) {
    const result = await Token.findById(id);
    return result;
  }

  async createToken(info) {
    const { refreshToken, id } = info;
    const result = await Token.create({ refreshToken, _id: id });
    return result;
  }

  async updateToken(info) {
    const { refreshToken, _id } = info;
    const result = await Token.findByIdAndUpdate(
      _id,
      { refreshToken },
      { returnOriginal: false }
    );
    return result;
  }

  async deleteToken(id) {
    const result = await Token.findOneAndDelete(id);
    return result;
  }
}

const tokenModel = new TokenModel();

export { tokenModel };
