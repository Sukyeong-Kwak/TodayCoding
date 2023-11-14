import { TodoService } from "../services/todo-service.js";
import { dayModel } from "../db/models/day-model.js";
import { todoModel } from "../db/models/todo-model.js";

const TodoController = {
  // 아이디와 날짜 별로 할일 초회
  async getTodo(req, res, next) {
    try {
      const { date, userId } = req.params;

      const day = await dayModel.findOrCreateDay({ userId, date });
      const dateId = day._id;

      const result = await TodoService.findTodos({
        userId,
        dateId,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },

  async createTodo(req, res, next) {
    try {
      const { date, completed, text, originalIndex } = req.body;
      const { userId, categoryId } = req.params;

      const day = await dayModel.findOrCreateDay({ userId, date });
      const dateId = day._id;

      const result = await TodoService.addTodo({
        userId,
        dateId,
        categoryNameId: categoryId,
        completed,
        text,
        originalIndex,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },

  // 할일 그룹(이름) 추가 (변경 후)
  async updateTodo(req, res, next) {
    try {
      const { todoId, userId } = req.params;
      const { completed, text } = req.body;

      const toUpdate = {
        ...((completed === true || completed === false) && { completed }),
        ...(text && { text }),
      };

      const result = await TodoService.changeTodo(todoId, toUpdate);

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },

  // todo 삭제
  async deleteTodo(req, res, next) {
    try {
      const { todoId } = req.params;
      const result = await TodoService.removeATodo(todoId);

      if (result === null) {
        return res
          .status(400)
          .json({ message: "해당 todo 목록이 더 이상 존재하지 않습니다." });
      }

      res.status(204).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
};

export { TodoController };
