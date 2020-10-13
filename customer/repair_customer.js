'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const purchaseConnection = io.connect(host);

purchaseConnection.emit('join', 'repairOrder');

// purchaseConnection.emit('getAll', 'purchase');

purchaseConnection.on('repair-completed', repair_completed);

function repair_completed(order){
  setTimeout(()=>{
    console.log(`Thank you for taking care of customer: ${order.customerName}'s order`);
  },1000);
}
