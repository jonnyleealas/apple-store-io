'use strict';

const io = require('socket.io')(3000);

const salesNameSpace = io.of('/sales');
// const repairNameSpace = io.of('/repair');

var salesOrderQueue = {
  sales_order:{},
};

var repairOrderQueue = {
  repair_order:{},
};

// customer  queue in store hub



// function getAll (room){
//   //get back later
// }

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

salesNameSpace.on('connection', (socket)=>{

  socket.on('join', (room)=>{

    console.log('A new sales customer room with order ID is created:', room);
    socket.join(room);

  });



  
  // socket.on('getAll', getAll);

  // socket.on('received', msgReceived);

  // socket.on('sales_completed', handleCompleted);

  // socket.on('repair-completed', handleCompleted);


});

