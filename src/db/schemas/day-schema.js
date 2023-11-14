import { Schema } from "mongoose";

const daySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    // 날짜
    date: {
      type: String,
      required: true,
    },
    // 해당 날짜에 저장되는 이모티콘
    emoji: {
      type: String,
      required: false,
    },
  },
  {
    collection: "dates",
    timestamps: true,
  }
);

export { daySchema };
