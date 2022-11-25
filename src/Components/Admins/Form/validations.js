import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .messages({
      'string.empty': 'This field is required.',
      'string.min': 'Name must contain at least 3 letters.',
      'string.max': 'Name cannot have over 20 letters.',
      'string.pattern.base': 'Name must contain only letters.'
    }),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .messages({
      'string.empty': 'This field is required.',
      'string.min': 'Last name must contain at least 3 letters.',
      'string.max': 'Last name cannot have over 20 letters.',
      'string.pattern': 'Last name must contain only letters.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'This field is required.',
      'string.email': 'Invalid email format.'
    }),
  password: Joi.string()
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .messages({
      'string.empty': 'This field is required.',
      'string.pattern.base': 'Password must contain letters, numbers and at least 8 characters'
    })
});
