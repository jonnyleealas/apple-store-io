'use strict';

const io = require('socket.io')(3000);

const storeNameSpace = io.of('/store');

var salesOrderQueue = {
  sales_order:{},
};

var repairOrderQueue = {
  repair_order:{},
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

function msgReceived (room){
  //get back later
}

function handleCompleted(eventName, room=false){
  // a universal completed event handler
  return payload =>{
    const time = new Date();
    console.log({event: eventName, time, payload});
  };
}

storeNameSpace.on('connection', (socket)=>{
  console.log('Store Name Space connected', socket.id);

  socket.on('join', (room)=>{
    const validRoom = ['sales', 'repair', 'purchase', 'repairOrder'];
    if (validRoom.includes(room)){
      console.log(`Welcome to the ${room} room`);
      socket.join(room);
    }
  });

  socket.on('getAll', getAll);

  socket.on('received', msgReceived);

  socket.on('sales_completed', handleCompleted);

  socket.on('repair-completed', handleCompleted);


});

