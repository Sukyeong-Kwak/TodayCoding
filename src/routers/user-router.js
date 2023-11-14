import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import { userValidator } from "../middlewares/validators/user-validator.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";
import { upload } from "../modules/image-modules.js";

const userRouter = Router();

userRouter.post("/upload", upload.single("image"), (req, res) => {
  // 파일 업로드 성공
  res.json({ url: req.file.location });
});

// 회원가입
userRouter.post(
  "/users/register",
  userValidator.registerValidator,
  UserController.createUser
);
// 회원가입 아이디 중복 확인
userRouter.post(
  "/users/register/:loginId",
  UserController.checkDuplicationOfId
);
// 로그인
userRouter.post(
  "/auth/login",
  userValidator.loginValidator,
  UserController.login
);
// 사용자 정보 조회
userRouter.get("/users", tokenMiddleware, UserController.getUser);

// 사용자 정보 수정
userRouter.patch(
  "/users",
  upload.single("image"),
  // userValidator.updateUserValidator,
  tokenMiddleware,
  UserController.updateUser
);

userRouter.patch(
  "/users/password",
  tokenMiddleware,
  UserController.resetPassword
);

// 사용자 정보 삭제(탈퇴)
userRouter.delete("/users", tokenMiddleware, UserController.deleteUser);

// 카테고리 추가
userRouter.put(
  "/users/categories",
  userValidator.createCatValidator,
  tokenMiddleware,
  UserController.addCategory
);
// 카테고리 삭제
userRouter.delete(
  "/users/categories/:categoryId",
  tokenMiddleware,
  UserController.deleteCategoryAndTodo
);
// 카테고리 수정
userRouter.patch(
  "/users/categories/:categoryId",
  userValidator.updateCatValidator,
  tokenMiddleware,
  UserController.updateCategory
);
// 유저 전체 카테고리 조회
userRouter.get(
  "/users/categories",
  tokenMiddleware,
  UserController.getCategory
);

export { userRouter };
