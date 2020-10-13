'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';

const saleConnection = io.connect(host);

saleConnection.emit('join', 'sales');

saleConnection.emit('getAll', 'sales');

saleConnection.on('sales_waiting', sales_waiting);

function sales_waiting(order){
  setTimeout(()=>{
    console.log('Taking care of customer: ', order.customerName);
    console.log('Ticket Number: ', order.ticket);
    saleConnection.emit('received', 'sales');
  },1000);

  setTimeout(()=>{
    console.log('Sales completed for customer: ', order.customerName);
    saleConnection.emit('sales_completed');
  }, 3000);
}
