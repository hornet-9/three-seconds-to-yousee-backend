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

const coords = [
  {step: 1, north: 55.661318, east: 12.540677},
  {step: 2, north: 55.660277, east: 12.540140},
  {step: 3, north: 55.658673, east: 12.539180},
  {step: 4, north: 55.657451, east: 12.538521},
  {step: 5, north: 55.656395, east: 12.537942},
  {step: 6, north: 55.655420, east: 12.537824},
  {step: 7, north: 55.654709, east: 12.537947},
  {step: 8, north: 55.654055, east: 12.538281},
  {step: 9, north: 55.653664, east: 12.538560},
  {step: 10, north: 55.653271, east: 12.538742},
  {step: 11, north: 55.653371, east: 12.539026},
  {step: 12, north: 55.653559, east: 12.539670},
  {step: 13, north: 55.653798, east: 12.540539},
  {step: 14, north: 55.654022, east: 12.541529},
  {step: 15, north: 55.654158, east: 12.542556},
  {step: 16, north: 55.654296, east: 12.543074}
]

coords.forEach(function(coord) {
  app.service('appointments').create(coord)
});


