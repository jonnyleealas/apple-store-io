'use strict';

const io = require('socket.io')(3000);

const storeNameSpace = io.of('/store');

// building up 4 empty queues for different events
var salesOrderQueue = {}, repairOrderQueue = {}, salesCompleteQueue={}, repairCompleteQueue={};

// building a map to pair queues with event names
var map = {
  'purchase_order': salesOrderQueue,
  'repair_order': repairOrderQueue,
  'sales_completed': salesCompleteQueue,
  'repair_completed': repairCompleteQueue,
};

/**
 * This function receives the key of targeted queue, then emit the event with the value of that key in targed room, after that, deleted the key : value pair in the queue.
 * @param {string} msg
 */
function getAll (msg){
  //get back later
  Object.keys(map[msg]).forEach(id => {
    let payload = map[msg][id];
    storeNameSpace.to(payload.orderHandler).emit(msg, payload);
    delete map[msg][id];
  });
}

/**
 * This function receives the key of targeted queue, and deleted the key : value pair in the queue.
 * @param {string} msg
 */
function msgReceived (msg){
  delete map[msg.target][msg.orderID];
}


/**
 * This function takes the event name, and an optional switch 'room', return a function with payload as param, console log the event, add the payload to the queue, then based on the 'room' switch status, decide wither broadcast the event in the name space or send it to a specific room.
 * @param {string} eventName Param to pass the event name to the handler.
 * @param {*} [room] optional. when is true, the function will emit the message to the room specific room passed in the payload
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

