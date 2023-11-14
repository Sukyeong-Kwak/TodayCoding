import Joi from "joi";

const todoValidator = {
  async creatTodoValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      date: Joi.string()
        .pattern(new RegExp("\\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])"))
        .required(),
      completed: Joi.boolean().required(),
      text: Joi.string().required(),
      originalIndex: Joi.number().required(),
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

  async updateTodoValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      completed: Joi.boolean(),
      text: Joi.string(),
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

export { todoValidator };
