#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app"
import debug from 'debug';
debug('post-it-api:server')
import http from 'http'
import connectDb from "../utilities/Database/database"

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Connect to DB and then listen on provided port, on all network interfaces.
 */

connectDb(() => {
  server.on('error', onError);
  server.listen(port);
  server.on('listening', onListening);
})

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
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
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: any) => {
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
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  console.log(`Connected to port ${port}`)
  try {
    const addr = server.address()!;
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  } catch (err) {
    console.log(err)
  }
}
