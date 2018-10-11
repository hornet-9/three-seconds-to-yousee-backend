/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');


process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);
