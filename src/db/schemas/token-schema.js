import { Schema } from "mongoose";

const tokenSchema = new Schema(
  {
    // userId(로그인 id X, 고유번호)
    _id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // refresh token
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);

export { tokenSchema };
