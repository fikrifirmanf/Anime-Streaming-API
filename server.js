require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const PORT = process.env.PORT || 3000
const router = require('./routes/routes')

app.use(cors())
app.use(helmet())

app.use('/api',router)

app.listen(PORT, ()=>{
    console.log('Server connected on port '+PORT)
})