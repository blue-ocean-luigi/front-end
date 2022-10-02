require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes.js");
const pool = require('../db/postgres.js')

app.use(express.json());
app.use(cors());

app.use("/communitycrossing", router);

const port = process.env.PORT || 3001;
console.log(process.env.PORT, process.env.DB_NAME)

app.listen((port), () => {
  console.log(`Server is running on port:${port}`);
});
