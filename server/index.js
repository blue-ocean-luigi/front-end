const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes.js')


app.use(express.json())
app.use(cors())

app.use(router)


app.listen(1234);
console.log('server listening on port 1234');