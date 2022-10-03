require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes.js");
const pool = require('../db/postgres.js')
const morgan = require('morgan')

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/crossing", router);

const port = process.env.PORT || 3001;

app.listen((port), () => {
  console.log(`Server is running on port:${port}`);
});
