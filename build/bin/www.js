#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const debug_1 = __importDefault(require("debug"));
(0, debug_1.default)('post-it-api:server');
const http_1 = __importDefault(require("http"));
const database_1 = __importDefault(require("../utilities/Database/database"));
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Connect to DB and then listen on provided port, on all network interfaces.
 */
(0, database_1.default)(() => {
    server.on('error', onError);
    server.listen(port);
    server.on('listening', onListening);
});
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '8080');
app_1.default.set('port', port);
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
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
};
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    console.log(`Connected to port ${port}`);
    try {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        (0, debug_1.default)('Listening on ' + bind);
    }
    catch (err) {
        console.log(err);
    }
};
