'use strict';
// This is the purchasing customer's app
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';
const purchaseConnection = io.connect(host);

purchaseConnection.emit('join', 'purchaseOrder');

purchaseConnection.emit('getAll', {eventName: 'sales_completed', room: 'purchaseOrder'});

purchaseConnection.on('sales_completed', sales_completed);

function sales_completed(order){
  let goodStuff = ['iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro MAX', 'iPad Air', 'iPad Pro 11-inch', 'iPad Pro 12.9-inch'];
  let randomOrder = goodStuff[Math.floor(Math.random() * goodStuff.length)];

  console.log(`Purchasing customer ${order.customerName} received his new ${randomOrder}. Thank you! `);
  console.log('---------------------------------------------------------------------');

  purchaseConnection.emit('received', {orderID: order.orderID, target: 'sales_completed'});
}


