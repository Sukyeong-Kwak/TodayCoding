import { dayModel } from "../db/models/day-model.js";
import { todoModel } from "../db/models/todo-model.js";
import moment from "moment";

async function deliverTodo() {
  try {
    const userId = "64e69a6cefa6f67bf7416ac0";
    // const today = moment().format("YYYYMMDD");
    // const yesterday = moment().subtract(1, "d").format("YYYYMMDD");
    const today = "20230802";
    const yesterday = "20230801";
    const todayData = await dayModel.findOrCreateDay({ userId, date: today });
    const yesterdayData = await dayModel.findOrCreateDay({
      userId,
      date: yesterday,
    });
    const todayId = todayData._id;
    const yesterdayId = yesterdayData._id;
    const todayTodo = await todoModel.find({ userId, dateId: todayId });
    const yesterdayTodo = await todoModel.find({ userId, dateId: yesterdayId });
    console.log("today: ", todayTodo.todos);
    console.log("yesterday: ", yesterdayTodo);
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
      message: "access token denied",
    };
  }
}

export { deliverTodo };
