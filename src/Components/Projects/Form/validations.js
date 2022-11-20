import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.empty': 'Name required',
      'string.pattern.base': 'Name should be letters only',
      'string.min': 'Name should have a minimum length of 3 characters',
      'string.max': 'Name should have a maximum length of 30 characters',
      'any.required': 'Name required'
    }),
  description: Joi.string().min(5).max(150).required().messages({
    'string.empty': 'Description required',
    'string.min': 'Description should have a minimum length of 5 characters',
    'string.max': 'Description should have a maximum length of 150 characters',
    'any.required': 'Description required'
  }),
  startDate: Joi.date().greater('now').required().messages({
    'string.empty': 'StartDate required',
    'date.pattern.base': 'StartDate must be after today',
    'any.required': 'StartDate required'
  }),
  endDate: Joi.date().greater('now').messages({
    'date.pattern.base': 'EndDate must be after today'
  }),
  active: Joi.boolean().required().messages({
    'boolean.empty': 'Active required',
    'string.pattern.base': 'Active should be true or false',
    'any.required': 'Active required'
  }),
  clientName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'clientName required',
    'string.min': 'clientName should have a minimum length of 2 characters',
    'string.max': 'clientName should have a maximum length of 30 characters',
    'any.required': 'clientName required'
  })
  // teamMembers: Joi.array().items(teamMembersValidation)
});
