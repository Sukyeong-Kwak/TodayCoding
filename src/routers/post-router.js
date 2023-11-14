import { Router } from "express";
import { PostController } from "../controllers/post-controller.js";
import { postValidator } from "../middlewares/validators/post-validator.js";
import { tokenMiddleware } from "../middlewares/token-middleware.js";

const postRouter = Router();

// 한 회원의 게시글 전체 조회
postRouter.get("/posts", tokenMiddleware, PostController.getPosts);
// 게시글 개별 전체 조회
postRouter.get("/posts/:postId", tokenMiddleware, PostController.getAPost);
// 게시글 추가
postRouter.post(
  "/posts",
  postValidator.createPostValidator,
  tokenMiddleware,
  PostController.createPost
);
// 게시글 수정
postRouter.patch(
  "/posts/:postId",
  postValidator.updatePostValidator,
  tokenMiddleware,
  PostController.updatePost
);
// 게시글 삭제
postRouter.delete("/posts/:postId", tokenMiddleware, PostController.deletePost);

export { postRouter };
