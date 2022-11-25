import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .messages({
      'string.pattern.base': 'Must contain only letters',
      'string.min': 'Must have at least 3 characters',
      'string.max': 'Must contain less than 20 characters',
      'string.empty': 'This field is required.'
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .messages({
      'string.pattern.base': 'Must contain only letters',
      'string.min': 'Must have at least 3 characters',
      'string.max': 'Must contain less than 20 characters',
      'string.empty': 'This field is required.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Invalid email format.',
      'string.empty': 'This field is required.'
    }),
  password: Joi.string()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .messages({
      'string.empty': 'This field is required.',
      'string.pattern.base': 'It must contain letters, numbers and at least 8 characters.'
    })
});
