const express= require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const trialSchema = new mongoose.Schema({
  name: {"type": String, required: true},
  age: {"type": Number},
 });

const mongoURI = 'mongodb://localhost:27017/gallery';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));