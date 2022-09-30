const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes.js')

import {pool} from '../db/postgres.js';
import dotenv from 'dotenv';
dotenv.config()

// pool.connect()


app.use(express.json())
app.use(cors())

app.use(router)

const port = process.env.PORT || 3001

app.listen((port) => {
  console.log(`Server is running on port: ${port}`)
})