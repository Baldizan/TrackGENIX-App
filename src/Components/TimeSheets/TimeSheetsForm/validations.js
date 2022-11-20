import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().min(5).max(100),
  date: Joi.date(),
  hours: Joi.number().min(0),
  task: Joi.string().min(24),
  project: Joi.string().min(24),
  employee: Joi.string().min(24)
});
