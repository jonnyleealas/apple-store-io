'use strict';

const io = require('socket.io')(3000);

const storeNameSpace = io.of('/store');

var salesOrderQueue = {};

var repairOrderQueue = {};

var salesCompleteQueue={};

var repairCompleteQueue={};

var map = {
  'purchase_order': salesOrderQueue,
  'repair_order': repairOrderQueue,
  'sales_completed': salesCompleteQueue,
  'repair_completed': repairCompleteQueue,
};


function getAll (msg){
  //get back later
  Object.keys(map[msg.target]).forEach(id => {
    let payload = map[msg.target][id];
    storeNameSpace.to(payload.orderHandler).emit(msg.event, payload);
    delete map[msg.target][id];
  });
}

function msgReceived (msg){
  delete map[msg.target][msg.orderID];
}


/**
 * 
 * @param {string} eventName Param to pass the event name to the handler.
 * @param {*} [room] optional. when is true, then emit the message to the room
 */
function handleEvent(eventName, room=null){
  // The universal even handler
  return payload=>{
    const time = new Date();


    console.log('EVENT', {event: eventName, time, payload});

    map[eventName][payload.orderID] = payload;

    if (!room) {
      storeNameSpace.emit(eventName, map[eventName]);
    } else {
      Object.keys(map[eventName]).forEach(id => {
        let payload = map[eventName][id];
        storeNameSpace.to(room).emit(eventName, payload);
      });
    }
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

  socket.on('received', msgReceived);

  socket.on('sales_completed', handleEvent('sales_completed', 'purchaseOrder'));

  socket.on('repair_completed', handleEvent('repair_completed', 'repairOrder'));

  socket.on('purchase_order', handleEvent('purchase_order', 'salesRep'));

  socket.on('repair_order', handleEvent('repair_order', 'repairTech'));


});

