import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^([^0-9]*)$/i, 'Only letters'),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^([^0-9]*)$/i, 'Only letters'),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().pattern(
    /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    'Letters, numbers and a minimum of 8 characters'
  )
});
