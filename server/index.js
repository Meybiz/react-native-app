const express = require('express');
const userRouter = require('./router/user.router')
const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use('/api', userRouter)
app.listen(PORT, () => console.log('Server run'))