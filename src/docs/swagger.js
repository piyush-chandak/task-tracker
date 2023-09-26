const { version } = require('../../package.json');
const { config } = require('../config');

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Task Tracker API documentation',
    version,
  },
  servers: [
    {
      url: `${config.SERVER_URL}/api`,
    },
  ],
};

module.exports = swagger;
