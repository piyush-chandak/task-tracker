const app = require('./app');
const { config, logger, database } = require('./config');

app.listen(config.PORT, async () => {
  logger.info(`Listening to port ${config.PORT}`);

  database
    .authenticate()
    .then(() => logger.info('Connected to Postgres DB'))
    .catch((err) => logger.error('Unable to connect to the postgres db:', err));
});

process.on('unhandledRejection', (reason) => {
  logger.error(`unhandledRejection: ${JSON.stringify(reason)}`);
  throw reason;
});

process.on('uncaughtException', (error) => {
  if (error) {
    logger.error(`uncaughtException: ${JSON.stringify(error)}`);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
});
