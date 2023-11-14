import { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    dateId: {
      type: Schema.Types.ObjectId,
      ref: "dates",
      required: true,
    },
    // todo가 속한 카테고리 이름
    categoryNameId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    originalIndex: {
      type: Number,
      required: true,
    },
    // todos: {
    //   type: [{ completed: Boolean, text: String, originalIndex: Number }],
    //   // todos 값에 자동으로 _id가 부여되는데
    //   //ex. {completed: false, text: "해야 할 일", originalIndex: 3, _id: ObjectID("asdfasd56f4a6878asdf"))
    //   // _id가 자동으로 부여되지 않도록 할 수 있을까요?
    //   required: false,
    // },
  },
  {
    collection: "todos",
    timestamps: true,
  }
);

export { todoSchema };
