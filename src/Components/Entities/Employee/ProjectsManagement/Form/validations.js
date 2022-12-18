import Joi from 'joi';

const employeesValidation = Joi.object({
  employeeId: Joi.string().required().messages({
    'string.empty': 'Select employee'
  }),
  role: Joi.valid('DEV', 'QA', 'TL', 'PM').required().messages({
    'any.only': 'Select a role'
  }),
  rate: Joi.number().min(1).max(1000).required().messages({
    'number.base': 'Rate must be a number',
    'any.only': 'Select a role',
    'number.min': 'Rate should have a minimum of 1',
    'number.max': 'Rate should have a maximum of 1000',
    'any.required': 'Rate required'
  })
});

export const schema = Joi.object({
  description: Joi.string().min(5).max(150).required().messages({
    'string.empty': 'Description required',
    'string.min': 'Description should have a minimum length of 5 characters',
    'string.max': 'Description should have a maximum length of 150 characters'
  }),
  employees: Joi.array().items(employeesValidation),
  active: Joi.boolean()
});
