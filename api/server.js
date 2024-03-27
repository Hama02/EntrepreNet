const express = require("express");
const cors = require("cors");
const connectDB = require("./connection.js");
const authRouter = require("./Routes/AuthRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ credentials: true }));
app.options("*", cors());
connectDB();

app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
