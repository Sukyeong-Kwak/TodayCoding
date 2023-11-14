import { Schema } from "mongoose";

const postSchema = new Schema(
  {
    // post 제목
    title: {
      type: String,
      required: true,
    },
    // post 내용
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      ref: "users",
      required: true,
    },
    dateId: {
      type: Schema.Types.ObjectId,
      ref: "dates",
      required: true,
    },
  },
  {
    collection: "posts",
    timestamps: true,
  }
);

export { postSchema };
