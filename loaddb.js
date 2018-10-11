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
  {step: 1, north: 55.670324, east: 12.539313},
  {step: 2, north: 55.670022, east: 12.539731},
  {step: 3, north: 55.669375, east: 12.540085},
  {step: 4, north: 55.669157, east: 12.540353},
  {step: 5, north: 55.668951, east: 12.541007},
  {step: 6, north: 55.668909, east: 12.541490},
  {step: 7, north: 55.669133, east: 12.542327},
  {step: 8, north: 55.669260, east: 12.542917},
  {step: 9, north: 55.669381, east: 12.543303},
  {step: 10, north: 55.668800, east: 12.543754},
  {step: 11, north: 55.668413, east: 12.543818},
  {step: 12, north: 55.668074, east: 12.544451},
  {step: 13, north: 55.667469, east: 12.544314},
  {step: 14, north: 55.666817, east: 12.543981},
  {step: 15, north: 55.666006, east: 12.543541},
  {step: 16, north: 55.665970, east: 12.543208},
  {step: 17, north: 55.666115, east: 12.542081},
  {step: 18, north: 55.666206, east: 12.541137},
  {step: 19, north: 55.666351, east: 12.540343},
  {step: 20, north: 55.666448, east: 12.539270},
  {step: 21, north: 55.666012, east: 12.539077},
  {step: 22, north: 55.665371, east: 12.538723},
  {step: 23, north: 55.665117, east: 12.539624},
  {step: 24, north: 55.664923, east: 12.540697},
  {step: 25, north: 55.664802, east: 12.542446},
  {step: 26, north: 55.664312, east: 12.542339},
  {step: 27, north: 55.663441, east: 12.541845},
  {step: 28, north: 55.661318, east: 12.540677},
  {step: 29, north: 55.661318, east: 12.540677},
  {step: 30, north: 55.660277, east: 12.540140},
  {step: 31, north: 55.658673, east: 12.539180},
  {step: 32, north: 55.657451, east: 12.538521},
  {step: 33, north: 55.656395, east: 12.537942},
  {step: 34, north: 55.655420, east: 12.537824},
  {step: 35, north: 55.654709, east: 12.537947},
  {step: 36, north: 55.654055, east: 12.538281},
  {step: 37, north: 55.653664, east: 12.538560},
  {step: 38, north: 55.653271, east: 12.538742},
  {step: 39, north: 55.653371, east: 12.539026},
  {step: 40, north: 55.653559, east: 12.539670},
  {step: 41, north: 55.653798, east: 12.540539},
  {step: 42, north: 55.654022, east: 12.541529},
  {step: 43, north: 55.654158, east: 12.542556},
  {step: 44, north: 55.654296, east: 12.543074}
]

coords.forEach(function(coord) {
  app.service('appointments').create(coord)
});






















