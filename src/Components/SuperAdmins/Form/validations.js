import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^([^0-9]*)$/i)
    .messages({
      'string.pattern.base': 'Must contain only letters',
      'string.min': 'Must have at least 3 characters',
      'string.max': 'Must contain less than 20 characters'
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^([^0-9]*)$/i)
    .messages({
      'string.pattern.base': 'Must contain only letters',
      'string.min': 'Must have at least 3 characters',
      'string.max': 'Must contain less than 20 characters'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Invalid email format.'
    }),
  password: Joi.string()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .message({
      'string.pattern.base': 'It must contain letters, numbers and at least 8 characters.'
    })
});
