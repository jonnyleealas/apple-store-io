'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const saleConnection = io.connect(host);

saleConnection.emit('join', 'salesRep');

saleConnection.emit('getAll', {eventName: 'purchase_order', room:'salesRep'} );

saleConnection.on('purchase_order', sales_waiting);

function sales_waiting(order){

  console.log('Taking care of customer: ', order.customerName);
  console.log('Ticket Number: ', order.orderID);
  saleConnection.emit('received', {orderID: order.orderID, target: 'purchase_order'});

  setTimeout(()=>{
    console.log('Sales completed for customer: ', order.customerName);
    console.log('---------------------------------');
    saleConnection.emit('sales_completed', order);
  }, 3000);
}
