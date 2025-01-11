const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// DB Connect
connectDB();

// body parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default Route

app.get("/", (req, res) => {
  res.json({
    msg: "WELLCOME TO CRUD",
  });
});

app.use("/api/todo", require("./routes/routes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT : ${PORT}`);
});
