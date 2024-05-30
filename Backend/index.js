const express = require('express')
const cors = require('cors')

const connectToMongo = require('./db')
connectToMongo();

const router = require('./Routes/router')

const app = express()

app.use(cors());
app.use(express.json());

app.use(router);

const port = 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
