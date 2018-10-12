// Initializes the `appointments` service on path `/appointments`
//const createService = require('feathers-nedb');
//const createModel = require('../../models/appointments.model');
const hooks = require('./appointments.hooks');

module.exports = function (app) {
 // const Model = createModel(app);
 // const paginate = app.get('paginate');

 // const options = {
   // Model,
   // paginate
 // };

  // Initialize our service with any options it requires
  //app.use('/appointments', createService(options));

  // Get our initialized service so that we can register hooks
  //const service = app.service('appointments');

 // service.hooks(hooks);
};
