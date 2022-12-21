import Joi from 'joi';

export const schemaPass = Joi.object({
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
