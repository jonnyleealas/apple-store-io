# apple-store-io

Application simulating store and customer transactions using Socket.io namespaces, and join room capabilities.

## Business Requirements

As a business, our primary goal is to make sure the purchasing and repairing customer is being taking care of.

We have 2 kinds of customer for this service: purchasing customer and reairing custoer.

We have 2 kinds of servicing  representatives for our store, the sales rep and repair tech.

## Architecture

```
Javascript
Node.js
Socket.io
faker
```

## Technical requirements

### Events Starter

---

Simulating multiple customers orders. This is where everything purchasing order and repairing order get started

1. emit an 'purchase_order' event to the Store every ( 3 ) sec
2. emit an 'repair_order' event to the Store every ( 4 ) sec

### Purchasing Customer app

---

1. when started, join the 'purchaseOrder' room
2. emit a 'getAll' event, to get all the events in the queue
3. listen for "sales_completed'' event from the room
4. console log purchasing finished message.	5. send back 'received' event so the event could be deleted from the queue

### Repairing Customer app

---

1. when started, join the 'repairOrder' room
2. emit a 'getAll' event, to get all the events in the queue
3. listen for 'repair_completed' event from the room
4. console log repairing finished message.
5. send back 'received' event so the event could be deleted from the queue

### sale's repe app

---

do one thing, to handle the customer's order in queue

1. emit 'join' event to Store's  'salesRep' room
2. emit a 'getAll' event, to get all the events in the queue
3. listen for 'purchase_order' event from the store
4. console log a message saying in process
5. send back 'received' event so the event could be deleted from the queue
6. wait ( 3  )  sec, emit a 'sales_completed'' event for each order to the hub
7. console log a message saying it's done

### repair Technician app

---

do one thing:  repair the customers' stuff
1. emit 'join' event to Store's 'repairTech' room
2. emit a 'getAll' event, to get all the events in the queue
3. listen for 'repair_order' event from the room
4. console log a message saying in process
5. send back 'received' event so the event could be deleted from the queue
6. wait ( 3 ) sec, emit a 'repair_completed' event for each order received to the hub
7. console log a message saying it's done

### Store, which is the main hub

1. listens to "join", to join different namespace ( sales, repair, different customers)

2. listens to 'getAll' from all parties. 
   1. Able to handle this event for all parties, all kinds of events.
      1. Purchasing customer can get all 'purchase_completed' event back from the
     queue if they go off line.
      2. Repairing customer can get all 'repair_completed' event back from the
     queue if they go off line.
      3. Sales Rep can get all 'purchase_order' event back from the
     queue if they go off line.

      4. Repair Tech can get all 'repair_order' event back from the
     queue if they go off line.

   2. once 'getAll' event is heard, go the proper queue to find info based on the param being passed
   3. emit proper events to the different rooms for every single item in the queue, based on the param being passed.

3. Listen to the 'received' event, then delete the event in the proper queue.

4. listen to "'purchase_order'' event from the purchasing customer app
    1. Once the ''purchase_order' event is heard, put the order in the proper queue for the sales rep app.
    2. emit 'purchase_order' event to the salesRep room for every single order in the queue.

5. listens to "repair_order' event from the customer
    1. Once the ''repair_order' event is heard, put the order in the proper queue for the Repair Tech app.
    2. emit a ''repair_order' event to the repairTech room for every single order in the queue.

6. listens to 'repair_completed' event from the tech app
     1. Once the 'repair_completed' event is heard, put the order in the proper queue for the Repair Tech app.
     2. emit an 'repair_completed' event to the repairOrder room for every single order in the queue.

7. listens to "'sales_completed" from  sale's representative app''
   1. Once the sales_completed event is heard, put the order in the proper queue for the Repair Tech app.
   2. emit an sales_completed event to the purchaseOrder room for every single order in the queue.
