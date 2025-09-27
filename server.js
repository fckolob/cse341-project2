const express = require('express');
const app = express();

const cors = require('cors');
const port = process.env.PORT || 3000;
const mongodb = require('./routes/datax/database');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const bodyparser = require('body-parser');

app.use(bodyparser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))

// Basic express session({..}) initialization.
.use(passport.initialize())
// init passport on every route call.
.use(passport.session())
// allow passport to use "express-session".
.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE");
  next();
})

app.use(cors({
  origin: [
    'https://cse341-project2-wok4.onrender.com',
    'http://localhost:3000'
  ]
}));
app.use(bodyparser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id}, function (err, user){
    return done(null, profile);
    //})
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureReadirect: '/api-docs', session: true
}),
(req, res) => {
console.log('GitHub user:', req.user);
req.session.user = req.user;
res.redirect('/');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.id, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
})

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database');
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected. Server is running at http://localhost:${port}`);
    });
  }
});
