const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes.js')
const pool = require('../db/postgres.js');
const dotenv = require ('dotenv');
dotenv.config()

// pool.connect()


app.use(express.json())
app.use(cors())

app.use(router)

const port = process.env.PORT || 3001

app.listen((port) => {
  console.log(`Server is running on port: ${port}`)
})