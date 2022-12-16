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
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message('Phone number must be a 10 digits value.'),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Invalid email format.'
    }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must contain at least 8 characters.',
      'string.pattern.base': 'Password must contain both letters and numbers.'
    }),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Password confirmation is required'
  })
});
