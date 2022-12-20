import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .min(3)
    .max(20)
    .messages({
      'string.empty': 'First Name is required.',
      'string.pattern.base': 'Name should be letters only',
      'string.min': 'First name must contain at least 3 letters.',
      'string.max': 'First name cannot have over 40 letters.'
    }),
  lastName: Joi.string()
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .min(3)
    .max(20)
    .messages({
      'string.empty': 'Last Name is required.',
      'string.pattern.base': 'Name should be letters only',
      'string.min': 'Last name must contain at least 3 letters.',
      'string.max': 'Last name cannot have over 40 letters.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Invalid email format.'
    })
});
