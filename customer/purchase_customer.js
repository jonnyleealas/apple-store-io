'use strict';
// This is the sales rep a
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';
const faker = require('faker');

const purchaseConnection = io.connect(host);

purchaseConnection.emit('join', 'purchaseOrder');

// purchaseConnection.emit('getAll', 'purchaseOrder');

purchaseConnection.on('sales-completed', sales_completed);

function sales_completed(order){
  setTimeout(()=>{
    console.log(`Thank you for taking care of customer: ${order.customerName}'s order`);
  },1000);
}


function newPurchaseOrder(){
  setInterval(()=>{
    let order = {
      orderID: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
      orderHandler: 'salesRep',
    };

    purchaseConnection.emit('purchase_order', order);
  }, 5000);
}

newPurchaseOrder();
