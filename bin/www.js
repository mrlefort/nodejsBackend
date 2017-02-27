#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('Keebin:server');
var http = require('http');

var fs = require("fs");
var https = require("https");
var cluster = require("cluster");
const numCPUs = require('os').cpus().length;

var key = fs.readFileSync('../keebin-key.pem');
var cert = fs.readFileSync('../keebin-cert.pem')

var https_options = {
    key: key,
    cert: cert
};

/**
 * Get port from environment and store in Express.
 */

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.set('port', server_port);

/**
 * Create HTTP server.
 *
 */

if (cluster.isMaster)
{
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++)
    {
        cluster.fork();
    }
    cluster.on('online', function (worker)
    {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker, code, signal)
    {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
}
else {
  // http.createServer(app).listen(server_port, server_ip_address, function () {
  //     console.log( "Listening on " + server_ip_address + ", port " + server_port )
  // });

    /**
     * Listen on provided port, on all network interfaces.
     */

   https.createServer(https_options, app).listen(server_port, server_ip_address, () =>
    {
        console.log('Worker thread ' + process.pid + ' started. Lytter på ' + server_port + ', bundet til ' + server_ip_address + ' - https slået til');
    });
}

// server.on('error', onError);
// server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
