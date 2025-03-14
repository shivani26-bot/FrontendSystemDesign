const express = require("express");
const WebSocket = require("ws");

const app = express();

// Initialize WebSocket server
// web socket connection listening on port 5000
const wss = new WebSocket.Server({ port: 5000 });

// WebSocket event handling
// connection established from client, the call back function will be triggered

wss.on("connection", (ws) => {
  console.log("A new client connected.");

  // Event listener for incoming messages
  ws.on("message", (message) => {
    console.log("Received message:", message.toString());

    // when client emits a message, you will receive the message data
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // Event listener for client disconnection
  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

// Start the server, express app is running on 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// npm init
// npm i express ws ndoemon
