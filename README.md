# apple-store-io 
Application simulating store and customer transactions using Socket.io namespaces, and join room capabilities. 

## Business Requirements
As a business, our primary goal is to increase the visibility on the state of packages in the delivery process.

We have 2 major clients for this service: Vendors and Drivers. Each need to have full and live visibility into the state of a package as it’s being delivered to a customer
## Architecture:

```
Javascript
Node.js
Socket.io
faker

```

## Step 1
Clone repository
```
Run npm i
```
## Step 2
Touch .env and use the following variables so hide backend secrets.
```
add a .env folder in your root 

```
## Testing
``` 
npm test server.test.js
```
### Task Checklist
**V1 Event Driven Programming**
```
- [x] As products are sold that need to be delivered, we need to alert the drivers that a package need pickup.
- [x] As a driver picks up a package, the store owner should know that the package is now “in transit”
- [x] Once the driver delivers a package, the store owner should know that the package has been delivered
- [x] Drivers need a way to scan a package and alert the vendors that the package is in transit

```
**V2 Socket.io**
```
- [x] UML
- [x] README.md
- [] CAPS will connect vendors and clients.
- [] Each store will have its own room.
- [] Start socket.io on a designated port.
- [] Monitor pickup
- [] Monitor in-transit
- [] Monitor delivered
- [] Broadcast events and payload to appropriate clients in CAPS.
- [] Pickup can broadcast on all sockets.
- [] in-transit and delivered goes to correct vendor. Emit message and payload.
```
### Dependencies
```
"dotenv": "^8.2.0",
"socket.io": "^2.3.0",
"socket.io-client": "^2.3.1"
"faker": "^5.1.0"
```
### UML
- [Application UML Diagram](./assets/storeuml.md)

