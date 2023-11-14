import { TodoService } from "../services/todo-service.js";
import { userModel } from "../db/models/user-model.js";
import { dayModel } from "../db/models/day-model.js";
import { todoModel } from "../db/models/todo-model.js";
import dayjs from "dayjs";
import { ObjectId } from "mongoose";

async function deliverTodo(userId) {
  const now = dayjs();

  const todayDate = now.format("YYYYMMDD");
  const yesterdayDate = now.subtract(1, "day").format("YYYYMMDD");

  const today = await dayModel.findOrCreateDay({
    userId,
    date: todayDate,
  });
  const todayId = today._id.toString();

  const yesterday = await dayModel.findOrCreateDay({
    userId,
    date: yesterdayDate,
  });
  const yesterdayId = yesterday._id;

  const yesterdayTodos = await TodoService.findNotCompletedTodos({
    userId,
    dateId: yesterdayId,
  });

  const CopyOfYesterdayTodos = JSON.parse(JSON.stringify(yesterdayTodos));

  const todayTodos = CopyOfYesterdayTodos.map((todo) => ({
    userId: todo.userId,
    dateId: todayId,
    categoryNameId: todo.categoryNameId,
    completed: todo.completed,
    text: todo.text,
    originalIndex: todo.originalIndex,
  }));

  for (const todayTodo of todayTodos) {
    await todoModel.create(todayTodo);
  }
}

export async function allUserDeliverTodo() {
  const allUsers = await userModel.find({});

  for (const user of allUsers) {
    deliverTodo(user._id.toString());
  }
}
