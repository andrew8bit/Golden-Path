require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig'); 
const flash = require('connect-flash');
const consoleSep = '****************************************';
const helper = require('./helper');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./models');


const app = express();
app.set('view engine', 'ejs');

// Session 
const SECRET_SESSION = process.env.SECRET_SESSION;
const isUserLoggedIn = require('./middleware/isUserLoggedIn.js');
const isInstructorLoggedIn = require('./middleware/isInstructorLoggedIn.js');
const instructor = require('./models/instructor');

// MIDDLEWARE
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// Session Middleware

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionObject));
// Passport
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add a session
// Flash 
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/course', require('./controllers/course'));
app.use('/student', require('./controllers/student'));
app.use('/instructor', require('./controllers/instructor'));

app.get('/', (req, res) => {
  console.log('HOME PAGE')
  db.course.findAll({
    include: [{model: db.instructor, as: 'instructor'}, {model: db.category, as: 'category'}, {model: db.subject, as: 'subject'}],
  }).then(courses => {
    res.render('homepage', { courses } );
  })
});

app.get('/results', (req, res) => {
  let searchQuery = req.query.search
  res.render('results', {searchQuery})
})

app.get('/profile', isUserLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;