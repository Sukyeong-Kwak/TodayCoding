import { Router } from "express";
import { TodoController } from "../controllers/todo-controller.js";
import { todoValidator } from "../middlewares/validators/todo-validator.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

const todoRouter = Router();

// 해당 아이디가 특정 날짜에 만든 todo들 모두 조회
todoRouter.get("/todos/:date", tokenMiddleware, TodoController.getTodo);

// 할 일 목록 추가
todoRouter.post(
  "/todos/:categoryId",
  todoValidator.creatTodoValidator,
  tokenMiddleware,
  TodoController.createTodo
);
// 할 일 목록 삭제
todoRouter.delete("/todos/:todoId", tokenMiddleware, TodoController.deleteTodo);
// 할 일 목록 수정
todoRouter.patch(
  "/todos/:todoId",
  todoValidator.updateTodoValidator,
  tokenMiddleware,
  TodoController.updateTodo
);

export { todoRouter };
