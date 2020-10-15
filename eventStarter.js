'use strict';
// This is where everything get started
const io = require('socket.io-client');
const host = 'http://localhost:3000/store';
const faker = require('faker');
const storeConnection = io.connect(host);

function newOrder(eventName, interval){
  setInterval(()=>{
    let order = {
      orderID: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    };

    storeConnection.emit(eventName, order);
  }, interval);
}

newOrder('purchase_order', 300);
newOrder('repair_order', 400);
