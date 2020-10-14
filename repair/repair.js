'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const repairConnection = io.connect(host);

repairConnection.emit('join', 'repairTech');

repairConnection.emit('getAll', 'repair_order');

repairConnection.on('repair_order', repair_waiting);

function repair_waiting(order){

  console.log('Taking care of customer: ', order.customerName);
  console.log('Ticket Number: ', order.orderID);
  repairConnection.emit('received', {orderID: order.orderID, target: 'repair_order'});

  setTimeout(()=>{
    console.log('Repair completed for customer: ', order.customerName);
    console.log('---------------------------------');
    repairConnection.emit('repair_completed', order);
  }, 3000);
}
