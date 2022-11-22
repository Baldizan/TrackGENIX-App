import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().min(5).max(100).messages({
    'string.empty': 'Description is required.',
    'string.min': 'Description must contain at least 5 characters.',
    'string.max': 'Description cannot contain over 100 letters.'
  }),
  date: Joi.date().messages({
    'date.empty': 'Date is required.',
    'date.base': 'Invalid date format.'
  }),
  hours: Joi.number().min(0).messages({
    'number.empty': 'Hours is required.',
    'number.base': 'Please enter a numeric value.',
    'number.min': 'You cannot subtract hours.'
  }),
  task: Joi.string().min(24).messages({
    'string.empty': 'Task is required.'
  }),
  project: Joi.string().min(24).messages({
    'string.empty': 'Project is required.'
  }),
  employee: Joi.string().min(24).messages({
    'string.empty': 'Employee is required.'
  })
});
