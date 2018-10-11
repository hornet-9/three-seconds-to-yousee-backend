const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const app = express(feathers());

const Model = new NeDB({
  filename: './data/appointments.db',
  autoload: true
});
app.use('/appointments', service({ Model }));

app.service('appointments').remove(null);
