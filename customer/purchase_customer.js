'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const purchaseConnection = io.connect(host);

purchaseConnection.emit('join', 'purchase');

// purchaseConnection.emit('getAll', 'purchase');

purchaseConnection.on('sales-completed', sales_completed);

function sales_completed(order){
  setTimeout(()=>{
    console.log(`Thank you for taking care of customer: ${order.customerName}'s order`);
  },1000);
}

