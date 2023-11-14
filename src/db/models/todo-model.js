import { model } from "mongoose";
import { todoSchema } from "../schemas/todo-schema.js";
import { userModel } from "./user-model.js";

import { ObjectId } from "mongodb";

const Todo = model("todos", todoSchema);

class TodoModel {
  async find(info) {
    const result = await Todo.find(info);
    return result;
  }

  async create(todoInfo) {
    const { userId, dateId, categoryNameId, completed, text, originalIndex } =
      todoInfo;
    const result = await Todo.create(todoInfo);
    return result;
  }

  async deleteATodo(id) {
    const result = await Todo.findByIdAndDelete(id);
    return result;
  }

  async deleteTodos(todoInfo) {
    const result = await Todo.deleteMany(todoInfo);
    return result;
  }

  async updateTodos(todoInfo) {
    const { todoId, todos } = todoInfo;
    const result = await Todo.findByIdAndUpdate(
      todoId,
      { todos },
      { returnOriginal: false }
    );
    return result;
  }

  async findByUserAndDateId(todoInfo) {
    const { userId } = todoInfo;
    const user = await userModel.findById(userId);
    const categories = user.categoryName;

    const allcategories = categories.map((cat) => {
      return { categoryName: cat._id, categoryId: cat._id };
    });

    for (const category of allcategories) {
      category.todos = await Todo.find({
        categoryNameId: category.categoryId,
        ...todoInfo,
      });
    }

    allcategories.map((todo) => {
      categories.forEach((category) => {
        if (todo.categoryName.toString() === category._id.toString()) {
          todo.categoryName = category.name;
        }
      });
    });

    return allcategories;
  }

  async updateTodo(todoId, toUpdate) {
    const result = await Todo.findByIdAndUpdate(todoId, toUpdate, {
      returnOriginal: false,
    });
    return result;
  }

  async deleteTodosByUserId(userId) {
    const result = await Todo.deleteMany(userId);
    return result;
  }
}

const todoModel = new TodoModel();

export { todoModel };
