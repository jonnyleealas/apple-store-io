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

// Main logic for event Hub server.
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

  socket.on('purchase_order', handleEvent('purchase_order', 'salesRep'));

  socket.on('repair_order', handleEvent('repair_order', 'repairTech'));

  socket.on('sales_completed', handleEvent('sales_completed', 'purchaseOrder'));

  socket.on('repair_completed', handleEvent('repair_completed', 'repairOrder'));

});

/**
 * This function receives the key of targeted queue, then emit the event with the value of that key in targed room
 * @param {string} msg
 */
function getAll (msg){
  emitEventsFromQueue(msg.eventName, msg.room);
}

/**
 * This function receives the key of targeted queue, and deleted the key : value pair in the queue.
 * @param {string} msg
 */
function msgReceived (msg){
  delete map[msg.target][msg.orderID];
}

/**
 *This function takes event name, find the proper queue and emit event to the namesapce from that queue. If Room is being passed, it will emit the event in that room only.
 * @param {string} eventName
 * @param {string} [room] optional param
 */
function emitEventsFromQueue(eventName, room=null){
  Object.keys(map[eventName]).forEach(id => {
    let payload = map[eventName][id];
    if (!room) storeNameSpace.emit(eventName, payload);
    else storeNameSpace.to(room).emit(eventName, payload);
  });
}

/**
 * This function takes the event name, and an optional string as socket.io room name , return a function will be ran with payload as param, console log the event, add the payload to the queue, then emits events from the queue.
 * @param {string} eventName Param to pass the event name to the handler.
 * @param {string} [room] optional. when is true, the function will emit the message to the room specific room passed in the payload
 */
function handleEvent(eventName, room=null){
  // The universal even handler
  return payload=>{
    const time = new Date();

    console.log('EVENT', {event: eventName, time, payload});

    map[eventName][payload.orderID] = payload;

    emitEventsFromQueue(eventName, room);
  };
}

