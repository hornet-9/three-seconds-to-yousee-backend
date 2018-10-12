const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const NeDB = require('nedb');
const service = require('feathers-nedb');
const app = express(feathers());

const Model = new NeDB({
  filename: './data/appointments.db',
  autoload: true
});
app.use('/appointments', service({
  Model
}));


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio(function (io) {
  io.on('connection', function (socket) {

    socket.on('pause', function () {
      app.service('appointments').create({
        step: 'pause'
      });
	io.sockets.emit('paused', true);
    });

    socket.on('unpause', function () {
	io.sockets.emit('paused', false);
      app.service('appointments').remove(null, {
        query: {
		step: 'pause'
	}
      });
    });

    socket.on('ready', function () {
      const appointments = app.service('appointments');

      let response;
      let i = 1;

      let qwerty = setInterval(func, 1500);


      async function func() {
        response = await appointments.find({
          query: {
            step: i
          }
        });

        // if not paused emit data
        app.service('appointments').find({
          query: {
            step: 'pause'
          }
        })
        .then(function (value) {
	
		console.log('hih', value.length);
            if (value.length !== 0) {
		return false;
            } else {
		console.log('comeon');
		console.log(response[0]);
		if (!response[0]) {
		console.log('ALL CLEAR');
                //clearInterval(qwerty);
              } else {
                	i++
                	socket.emit('news', response[0]);
		}
              }
          });
        }
    });
  });

  // Registering Socket.io middleware
  io.use(function (socket, next) {
    // Exposing a request property to services and hooks
    socket.feathers.referrer = socket.request.referrer;
    next();
  });
}));

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({
  logger
}));

app.hooks(appHooks);

module.exports = app;


const port = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
