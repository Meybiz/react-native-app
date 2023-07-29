const authRoutes  = require('./auth');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { db } = require('./signin');

dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('CONNECTED MONGO'))
  .catch((err) => console.log('ERROR', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/api', authRoutes);

app.listen(4000, () => console.log('Server run on 4000', process.env.DATABASE));

