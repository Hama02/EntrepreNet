const express = require("express");
const cors = require("cors");
const connectDB = require("./connection.js");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.options("*", cors());
connectDB();

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
