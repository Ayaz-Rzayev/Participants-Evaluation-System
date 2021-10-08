const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
//load environment variables from a .env file.
require('dotenv').config();
// Error handling
const ExpressError = require('./ExpressError');
const catchAsync = require('./catchAsync');
//Flash
const flash = require('connect-flash')
//Session
const session = require('express-session');
//Routes
const projectsRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const { connect } = require('http2');
ratesRoutes = require('./routes/rates');


// Connect to MongoDB with Mongoose
// 27017 is a default mongo port
mongoose.connect(process.env.DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected')
}).catch(err => {
  console.log(err)
})

// Necessary adjustments
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
const sessionConfg = {
  secret: 'password',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 1000 * 60 * 60 * 24 *7,
    maxAge: 1000 * 60 * 60 * 24 *7
  }
}
app.use(session(sessionConfg))
app.use((req, res, next) => {
  res.locals.currentUserId = req.session.user_id
  next()
})

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})
// Routes
// Home route
app.get('/', (req, res) => {
  res.render('home')
});

// Projects
app.use('/projects', projectsRoutes)
//User
app.use(userRoutes)
// app.use(ratesRoutes)


// Error handling
app.use((req, res, next)=>{
  next(new ExpressError('Page not found', 404))
});

app.use((err, req, res, next) => {
   const {status = 500, message = 'Something went wrong'} = err
   res.status(status).render('error', {status, message})
});

//Server
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
});