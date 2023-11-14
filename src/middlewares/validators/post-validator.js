import Joi from "joi";

const postValidator = {
  async createPostValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      date: Joi.string()
        .pattern(new RegExp("\\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])"))
        .required(),
      title: Joi.string().required(),
      content: Joi.string(),
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

  async updatePostValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string(),
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

export { postValidator };
