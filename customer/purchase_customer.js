'use strict';
// This is the sales rep a

const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000/sales';

const salesNameSpace = io.connect(host);

// salesNameSpace.on('sales-completed', sales_completed);

// function sales_completed(order){
//   setTimeout(()=>{
//     console.log(`Thank you for taking care of customer: ${order.customerName}'s order`);
//   },1000);
// }


setInterval( () => {

  let newSales = {
    customerName: faker.name.findName(),
    orderId: faker.random.uuid(),
    phoneNumber: faker.phone.phoneNumber()
  };

  salesNameSpace.emit('join', newSales.orderId);
  salesNameSpace.emit('newSales', newSales);
}, 5000);


