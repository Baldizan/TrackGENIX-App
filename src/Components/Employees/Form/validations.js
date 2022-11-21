import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().min(3).max(40).messages({
    'string.min': 'First name must contain at least 3 letters.',
    'string.max': 'First name cannot have over 40 letters.'
  }),
  lastName: Joi.string().min(3).max(40).messages({
    'string.min': 'Last name must contain at least 3 letters.',
    'string.max': 'Last name cannot have over 40 letters.'
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message('Phone number must be a 10 digits value.')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .messages({
      'string.email': 'Invalid email format.'
    }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .messages({
      'string.min': 'Password must contain at least 8 characters.',
      'string.pattern.base': 'Password must contain both letters and numbers.'
    }),
  project: Joi.string().length(24),
  active: Joi.boolean()
});
