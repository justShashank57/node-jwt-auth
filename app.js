const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

// view engine
app.set('view engine', 'ejs');

// database connection
const url = "mongodb+srv://admin:shanky@cluster0.pfusu6o.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url)
.then(()=>app.listen(3000,()=>{
  console.log("DB connected & listening to port:3000")
}))
// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));


