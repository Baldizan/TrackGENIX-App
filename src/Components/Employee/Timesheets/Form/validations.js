import Joi from 'joi';

export const schema = Joi.object({
  date: Joi.date(),
  hours: Joi.number().min(0).messages({
    'number.min': 'You cannot subtract hours.'
  })
});
