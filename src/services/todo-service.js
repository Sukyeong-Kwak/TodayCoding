import { todoModel } from "../db/models/todo-model.js";
import { dayModel } from "../db/models/day-model.js";
import { userModel } from "../db/models/user-model.js";

const TodoService = {
  async addTodo(todoInfo) {
    const { userId, dateId, categoryNameId, completed, text, originalIndex } =
      todoInfo;
    const result = await todoModel.create(todoInfo);

    return result;
  },

  async findTodos(todoInfo) {
    const { userId, dateId } = todoInfo;
    const result = await todoModel.findByUserAndDateId(todoInfo);
    return result;
  },

  async findTodoByUserIdAndDate(info) {
    const { userId, dateId } = info;
    const posts = await todoModel.find({ userId, dateId });
    return posts;
  },

  async changeName(info) {
    const { id, name } = info;
    const result = await todoModel.updateName(info);
    return result;
  },

  async changeTodo(todoId, toUpdate) {
    const result = await todoModel.updateTodo(todoId, toUpdate);
    return result;
  },

  async removeATodo(id) {
    const result = await todoModel.deleteATodo(id);
    return result;
  },

  async removeTodos(id) {
    const result = await todoModel.deleteTodos(id);
    return result;
  },

  async deleteAllDataByUserId(userId) {
    const result = await todoModel.deleteTodosByUserId({ userId });
    return result;
  },

  async findNotCompletedTodos(todoInfo) {
    const result = await todoModel.find({
      ...todoInfo,
      completed: false,
    });
    return result;
  },
};

export { TodoService };
