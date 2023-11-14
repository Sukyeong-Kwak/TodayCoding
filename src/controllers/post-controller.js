import { postModel } from "../db/models/post-model.js";
import { dayModel } from "../db/models/day-model.js";
import { PostService } from "../services/post-service.js";

const PostController = {
  async getPosts(req, res, next) {
    try {
      const { userId } = req.params;
      const { date } = req.query;

      const day = await dayModel.findOrCreateDay({ userId, date });
      const dateId = day._id;

      const result = await PostService.findPostsByIdAndDate({
        userId,
        dateId,
      });

      if (!result) {
        return res
          .status(400)
          .json({ message: "해당 글은 더 이상 존재하지 않습니다." });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },
  async getAPost(req, res, next) {
    try {
      const { postId } = req.params;
      const result = await postModel.findById(postId);

      if (!result) {
        return res
          .status(400)
          .json({ message: "해당 글은 더 이상 존재하지 않습니다." });
      }

      res.status(200).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },
  async createPost(req, res, next) {
    try {
      const { userId } = req.params;
      const { date, title, content } = req.body;
      const result = await PostService.addPost({
        userId,
        date,
        title,
        content,
      });

      res.status(201).json(result);
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  async updatePost(req, res, next) {
    try {
      const id = req.params.postId;
      const { title, content } = req.body;

      const result = await PostService.changePost({ id, title, content });

      if (result === null) {
        return res
          .status(400)
          .json({ message: "해당 글은 더 이상 존재하지 않습니다." });
      }

      res.status(200).json({
        title: result.title,
        content: result.content,
        userId: result.userId,
        id: result._id,
        createdAt: result.createdAt,
      });
    } catch (error) {
      res.json({ errorMessage: error.message });
    }
  },

  async deletePost(req, res, next) {
    try {
      const id = req.params.postId;
      const result = await PostService.removePost(id);

      if (result === null) {
        return res
          .status(400)
          .json({ message: "해당 글은 더 이상 존재하지 않습니다." });
      }

      res.status(204).json(result);
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  },
};

export { PostController };
