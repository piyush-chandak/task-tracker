const { DataTypes } = require('sequelize');
const { database } = require('../config');
const { TASK_STATUS } = require('../constants/task');

const Task = database.define(
  'tasks',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        max: 255,
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: [TASK_STATUS.OPEN, TASK_STATUS.INPROGRESS, TASK_STATUS.COMPLETED],
      defaultValue: TASK_STATUS.OPEN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Task;
