import express from "express";
import cors from "cors";
import events from "events";
const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

const messageEventEmitter = new events.EventEmitter();
//pub sub model
//api which client seeks to receive messages
app.get("/messages", (req, res) => {
  // whenever the newMessage event get triggered, trigger a callback function
  messageEventEmitter.once("newMessage", (from, message) => {
    res.json({ from, message });
  });
});

//this called when someone triggers a new message
app.post("/new-message", (req, res) => {
  const { from, message } = req.body;
  messageEventEmitter.emit("newMessage", from, message);
  res.json({ message: "success" });
});

app.listen(3000, () => {
  console.log("long polling server started");
});

// whenever the client hit the api /messages we will not immediately send the response
// we will block the response until and unless it's times out or our subscriber function
// is triggered from some publisher
//  to publish new event we have /new-message api
// this will trigger when some one sends a new message
