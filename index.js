const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTHTOKEN_ID
);
const port = process.env.PORT;

app.use(cors());
app.post("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

app.post("/send-text", (req, res) => {
  const { recipient, textmessage } = req.query;
  try {
    client.messages
      .create({
        body: textmessage,
        to: "+" + recipient,
        from: "+12183003275",
      })
      .then((message) => {
        console.log(message.body);
        res.send(message.body);
      })
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
  res.send("complete");
});

app.listen(port, () => console.log(`Running port on ${port}`));
