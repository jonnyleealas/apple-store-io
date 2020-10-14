'use strict';

const io = require('socket.io')(3000);

const storeNameSpace = io.of('/store');

var salesOrderQueue = {
  order:{},
};

var repairOrderQueue = {
  order:{},
};

// var salesCompleteQueue={
//   sales_completed:{},
// };

// var repairCompleteQueue={
//   repair_completed: {},
// };



function getAll (room){
  //get back later
}

// function msgReceived (room){
//   //get back later
// }

// function handleCompleted(eventName, room=false){
//   // a universal completed event handler
//   return payload =>{
//     const time = new Date();
//     console.log({event: eventName, time, payload});
//   };
// }

/**
 * An universal event handler
 * @ eventName
 * @ room
 */

function handleOrders(eventName, room=false){
  // The universal even handler
  return payload=>{
    const time = new Date();
    const map = {
      'purchase_order': salesOrderQueue,
      'repair_order': repairOrderQueue,
    };

    console.log('EVENT', {event: eventName, time, payload});

    map[eventName].order[payload.orderID] = payload;

    if (room===false) storeNameSpace.emit(eventName, map[eventName]);
    else storeNameSpace.to(payload.orderHandler).emit(eventName, map[eventName]);
  };
}


storeNameSpace.on('connection', (socket)=>{
  console.log('Store Name Space connected', socket.id);

  socket.on('join', (room)=>{
    const validRoom = ['salesRep', 'repairTech', 'purchaseOrder', 'repairOrder'];
    if (validRoom.includes(room)){
      console.log(`Welcome to the ${room} room`);
      socket.join(room);
    }
  });

  socket.on('getAll', getAll);

  // socket.on('received', msgReceived);

  // socket.on('sales_completed', handleCompleted);

  // socket.on('repair-completed', handleCompleted);

  socket.on('purchase_order', handleOrders('purchase_order', true));

  socket.on('repair_order', handleOrders('repair_order', true));


});

