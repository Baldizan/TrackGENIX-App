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
  name: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .required()
    .messages({
      'string.empty': 'Name required',
      'string.pattern.base': 'Name should be letters only',
      'string.min': 'Name should have a minimum length of 3 characters',
      'string.max': 'Name should have a maximum length of 30 characters'
    }),
  clientName: Joi.string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)
    .required()
    .messages({
      'string.empty': 'clientName required',

      'string.min': 'clientName should have a minimum length of 2 characters',
      'string.max': 'clientName should have a maximum length of 30 characters'
    }),
  description: Joi.string().min(5).max(150).required().messages({
    'string.empty': 'Description required',
    'string.min': 'Description should have a minimum length of 5 characters',
    'string.max': 'Description should have a maximum length of 150 characters'
  }),
  startDate: Joi.date().required().messages({
    'string.empty': 'StartDate required'
  }),
  endDate: Joi.date().greater(Joi.ref('startDate')).messages({
    'date.pattern.base': 'EndDate must be after today'
  }),
  active: Joi.boolean().required().messages({
    'boolean.empty': 'Active required',
    'string.pattern.base': 'Active should be true or false'
  }),

  employees: Joi.array().items(employeesValidation)
});
