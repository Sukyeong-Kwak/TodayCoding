import Joi from "joi";

const userValidator = {
  async registerValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      id: Joi.string().alphanum().min(3).max(30).required(),
      name: Joi.string().min(2).max(30).required(),
      password: Joi.string().required(),
      nickname: Joi.string().max(10).required(),
      aboutMe: Joi.string(),
      birthDate: Joi.string(),
      gender: Joi.string().max(2),
      profileImageUrl: Joi.string(),
    });
    try {
      await schema.validateAsync(body);
      if (
        body.gender !== undefined &&
        body.gender !== "남성" &&
        body.gender !== "여성"
      ) {
        throw new Error("wrong gender");
      }
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async loginValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      id: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().required(),
    });
    try {
      await schema.validateAsync(body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async updateUserValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string().email(),
      id: Joi.string().alphanum().min(3).max(30),
      name: Joi.string().min(2).max(30),
      password: Joi.string(),
      nickname: Joi.string().max(10),
      aboutMe: Joi.string(),
      birthDate: Joi.string(),
      gender: Joi.string().max(2),
      profileImgUrl: Joi.string(),
    });
    try {
      await schema.validateAsync(body);
      if (
        body.gender !== undefined &&
        body.gender !== "남성" &&
        body.gender !== "여성"
      ) {
        throw new Error("wrong gender");
      }
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async createCatValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      categoryName: Joi.string().min(1).max(30),
    });
    try {
      await schema.validateAsync(body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },

  async updateCatValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      changedName: Joi.string().min(1).max(30),
    });
    try {
      await schema.validateAsync(body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ code: "Bad Request", errorMessage: error.message });
    }
  },
};

export { userValidator };
