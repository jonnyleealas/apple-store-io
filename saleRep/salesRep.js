'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/sales';

const salesNameSpace = io.connect(host);

salesNameSpace.emit('join', 'sales');

salesNameSpace.emit('getAll', 'sales');

salesNameSpace.on('sales_waiting', sales_waiting);

function sales_waiting(order){
  setTimeout(()=>{
    console.log('Taking care of customer: ', order.customerName);
    console.log('Ticket Number: ', order.ticket);
    salesNameSpace.emit('received', 'sales');
  },1000);

  setTimeout(()=>{
    console.log('Sales completed for customer: ', order.customerName);
    salesNameSpace.emit('sales_completed');
  }, 3000);
}


// send customer into queue in 
// create room for every order id
// sales namespace listen to new sales and push to queue
/**

 salerep listens to this
 hub emits to salesrep
 rep waits 3 seconds
 sales is comeplete 
 emits sales complete
 hub deletes the info from queue
 */