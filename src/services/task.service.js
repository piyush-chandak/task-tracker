const { Op } = require('sequelize');
const moment = require('moment');
const { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } = require('../constants/app');
const { Task } = require('../models');
const { NotFoundError } = require('../utils/customError');
const { TASK_STATUS } = require('../constants/task');
const sequelize = require('../config/database');

const getAllTasks = async (options) => {
  const page = options.page || DEFAULT_PAGE;
  const pageSize = options.pageSize || DEFAULT_PAGE_SIZE;

  const where = {
    ...(options.status ? {
      status: {
        [Op.eq]: options.status,
      }
    } : null),
  };

  const { rows: tasks, count: totalCount } = await Task.findAndCountAll({
    where,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  return { tasks, totalCount };
};

const getTaskById = async (id) => {
  return await Task.findByPk(id);
};

const createTask = async (payload) => {
  const createBody = {
    title: payload.title,
    ...(payload.description ? { description: payload.description } : null),
    status: TASK_STATUS.OPEN,
  }
  return await Task.create(createBody);
};

const updateTask = async (taskId, payload) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new NotFoundError('Task not found');
  }

  const updateBody = {
    ...(payload.title ? { title: payload.title } : null),
    ...(payload.description ? { description: payload.description } : null),
    ...(payload.status ? { status: payload.status } : null),
  }
  return await task.update(updateBody);
};

const getMeterics = async function (options) {
  let { startDate, endDate } = options;

  const records = await Task.findAll({
    attributes: [
      [sequelize.fn('date_trunc', 'month', sequelize.col('created_at')), 'month'],
      [
        sequelize.fn('sum', sequelize.literal(`CASE WHEN "status" = '${TASK_STATUS.OPEN}' THEN 1 ELSE 0 END`)),
        'open',
      ],
      [
        sequelize.fn('sum', sequelize.literal(`CASE WHEN "status" = '${TASK_STATUS.INPROGRESS}' THEN 1 ELSE 0 END`)),
        'inprogress',
      ],
      [
        sequelize.fn('sum', sequelize.literal(`CASE WHEN "status" = '${TASK_STATUS.COMPLETED}' THEN 1 ELSE 0 END`)),
        'completed',
      ],
    ],
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ['month'],
    order: [['month', 'ASC']],
    raw: true,
  });

  const sDate = moment(startDate);
  const eDate = moment(endDate);

  const result = [];

  while (sDate.isBefore(eDate)) {
    const record = records.find(record => sDate.isSame(moment(record.month).format('YYYY-MM-DD')));

    result.push({
      month: sDate.format('YYYY-MM-DD'),
      open: record ? parseInt(record.open, 10) : 0, 
      inprogress: record ? parseInt(record.inprogress) : 0,
      completed: record ? parseInt(record.completed) : 0,
    });
    sDate.add(1, 'month');
  }

  return result;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  getMeterics,
};
