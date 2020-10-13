'use strict';
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const saleConnection = io.connect(host);

saleConnection.emit('join', 'sales');

