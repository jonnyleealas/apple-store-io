'use strict';
// This is the sales rep app
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';
const faker = require('faker');
const repairConnection = io.connect(host);

repairConnection.emit('join', 'repairOrder');

repairConnection.emit('getAll', 'repair_completed');

repairConnection.on('repair_completed', repair_completed);

function repair_completed(order){

  console.log(`Thank you for taking care of customer: ${order.customerName}'s order`);
  console.log('---------------------------------------------------------------------');

  repairConnection.emit('received', {orderID: order.orderID, target: 'repair_completed'});

}

function newRepairOrder(){
  setInterval(()=>{
    let order = {
      orderID: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
      orderHandler: 'repairTech',
    };

    repairConnection.emit('repair_order', order);
  }, 5000);
}

newRepairOrder();
