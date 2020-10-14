'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const repairConnection = io.connect(host);

repairConnection.emit('join', 'repairTech');

repairConnection.emit('getAll', 'repairTech');

repairConnection.on('repair_order', repair_waiting);

function repair_waiting(order){
  setTimeout(()=>{
    console.log('Taking care of customer: ', order.sales_order.customerName);
    console.log('Ticket Number: ', order.sales_order.orderID);
    repairConnection.emit('received', 'repair');
  },1000);

  setTimeout(()=>{
    console.log('Repair completed for customer: ', order.customerName);
    repairConnection.emit('repair_completed');
  }, 3000);
}
