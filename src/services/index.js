const appointments = require('./appointments/appointments.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(appointments);
};
