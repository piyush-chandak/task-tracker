const pick = require('../utils/pick');
const { taskService } = require('../services');
const { HTTP_STATUS } = require('../constants/app');
const moment = require('moment');
const { taskSerilizer } = require('../serilizers');

const getAllTasks = async function (req, res) {
  const options = pick(req.query, ['page', 'page_size']);

  const data = await taskService.getAllTasks({ page: options.page, pageSize: options.page_size });

  const result = {
    tasks: data.tasks ? data.tasks.map(task => taskSerilizer.serilizeTask(task)) : [],
    total_count: data.totalCount || 0,
  };

  res.status(HTTP_STATUS.OK).send(result);
};

const createTask = async function (req, res) {
  const payload = pick(req.body, ['title', 'description']);

  const task = await taskService.createTask(payload);

  res.status(HTTP_STATUS.CREATED).send(taskSerilizer.serilizeTask(task));
};

const updateTask = async function (req, res) {
  const payload = pick(req.body, ['title', 'description', 'status']);

  const task = await taskService.updateTask(req.params.id, payload);

  res.status(HTTP_STATUS.OK).send(taskSerilizer.serilizeTask(task));
};

const getMeterics = async function (req, res) {
  const options = pick(req.query, ['start_date', 'end_date']);

  const startDate = options.start_date ? moment(options.start_date) : moment().subtract(12, 'month');
  const endDate = options.end_date ? moment(options.end_date) : moment();

  const data = await taskService.getMeterics({
    startDate: startDate.startOf('month').toISOString(),
    endDate: endDate.endOf('month').toISOString(),
    status: options.status
  });

  const result = taskSerilizer.serilizeMeterics(data);

  res.status(HTTP_STATUS.OK).send(result);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getMeterics,
};
