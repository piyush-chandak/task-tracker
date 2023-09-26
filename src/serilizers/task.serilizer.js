const moment = require('moment');

function serilizeTask(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    created_at: new Date(task.createdAt).toISOString(),
    updated_at: new Date(task.updatedAt).toISOString(),
  }
}

function serilizeMeterics(data) {
  return data.map(d => {
    return {
      date: moment(d.month).format('MMMM YYYY'),
      metrics: {
        open_tasks: parseInt(d.open),
        inprogress_tasks: parseInt(d.inprogress),
        completed_tasks: parseInt(d.completed)
      }
    };
  });
}

module.exports = { serilizeTask, serilizeMeterics };
