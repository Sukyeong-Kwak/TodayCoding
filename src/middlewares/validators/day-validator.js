import Joi from "joi";

const dayValidator = {
  async addEmogiValidator(req, res, next) {
    const body = req.body;
    const schema = Joi.object({
      date: Joi.string()
        .pattern(new RegExp("\\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])"))
        .required(),
      emoji: Joi.any(),
      // 이모티콘만 받는 정규식을 모르겠어서 일단 string으로 해놓았습니다.
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

export { dayValidator };
