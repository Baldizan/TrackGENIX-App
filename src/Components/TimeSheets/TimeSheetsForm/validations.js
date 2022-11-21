import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().min(5).max(100).messages({
    'string.min': 'Description must contain at least 5 characters.',
    'string.max': 'Description cannot contain over 100 letters.'
  }),
  date: Joi.date().messages,
  hours: Joi.number().min(0).messages({
    'number.min': 'You cannot subtract hours.'
  }),
  task: Joi.string().min(24),
  project: Joi.string().min(24),
  employee: Joi.string().min(24)
});
