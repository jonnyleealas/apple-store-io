'use strict';
// This is the repairing customer's app
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';
const repairConnection = io.connect(host);

repairConnection.emit('join', 'repairOrder');

repairConnection.emit('getAll', {eventName: 'repair_completed', room:'repairOrder'});

repairConnection.on('repair_completed', repair_completed);

function repair_completed(order){
  let oldStuff = ['iPhone 8', 'iPhone 7', 'iPhone 11 Pro', 'iPhone 11 Pro MAX', 'iPad 2016', 'iPad Pro 10.5-inch', 'iPad Pro 12.9-inch'];
  let randomOrder = oldStuff[Math.floor(Math.random() * oldStuff.length)];

  console.log(`Repair for customer ${order.customerName}'s ${randomOrder} is now compeleted. Thank you! `);
  console.log('---------------------------------------------------------------------');

  repairConnection.emit('received', {orderID: order.orderID, target: 'repair_completed'});
}

