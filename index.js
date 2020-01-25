const express = require('express')
const cors = require('cors')
const app = express()

// PORT
const PORT = 8000

// router
const routers = require('./2.routers/routers')

app.use(cors())
app.use(express.json())

app.use('/', express.static('uploads'))

// endpoint
app.use('/api', routers)

app.listen(PORT, () => console.log('Listening port ' + PORT))