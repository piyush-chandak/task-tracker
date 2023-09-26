const Joi = require('joi');
const { TASK_STATUS } = require('../constants/task');
const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = require('../constants/app');

const getAllTasks = {
  query: Joi.object().keys({
    page: Joi.number().integer().default(DEFAULT_PAGE).min(1),
    page_size: Joi.number().integer().default(DEFAULT_PAGE_SIZE).min(1),
  }),
};

const createTask = {
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().optional().max(255),
    }),
};

const updateTask = {
  params: Joi.object().keys({
    id: Joi.number().required().min(0),
  }),
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional().max(255),
    status: Joi.string().optional().valid(TASK_STATUS.OPEN, TASK_STATUS.INPROGRESS, TASK_STATUS.COMPLETED),
  }),
};

const getMeterics = {
  query: Joi.object().keys({
    start_date: Joi.date().iso().optional(),
    end_date: Joi.date().iso().greater(Joi.ref('start_date')).optional(),
  }),
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getMeterics,
};
