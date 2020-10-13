'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const repairConnection = io.connect(host);

repairConnection.emit('join', 'repair');

repairConnection.emit('getAll', 'repair');

repairConnection.on('repair_waiting', repair_waiting);

function repair_waiting(order){
  setTimeout(()=>{
    console.log('Taking care of customer: ', order.customerName);
    console.log('Ticket Number: ', order.ticket);
    repairConnection.emit('received', 'repair');
  },1000);

  setTimeout(()=>{
    console.log('Repair completed for customer: ', order.customerName);
    repairConnection.emit('repair_completed');
  }, 3000);
}
