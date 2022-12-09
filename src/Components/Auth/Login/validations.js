import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Invalid email format.'
    }),
  password: Joi.string().messages({
    'string.empty': 'Password is required.'
  })
});
