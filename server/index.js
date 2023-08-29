process.env.TZ = 'ISO'
const express = require('express');
const userRouter = require('./router/user.router')
const PORT = process.env.PORT || 8080
const helmet = require('helmet')
const app = express()
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const limited = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(cors())
app.use(limited)
app.use(helmet())
app.use(express.json())
app.use('/api', userRouter)
app.listen(PORT, () => console.log('Server run'))