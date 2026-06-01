require('dotenv').config();
const express = require('express');
const { connectDB } = require('./data/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const passport = require('passport');
const session = require('express-session');
const gitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize())

app.use(passport.session())

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT']}))
app.use(cors({ origin: '*' }))
app.use('/', require('./routes/index'))

passport.use(new gitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({githubid:profile.id}, function (err, user){
    return done(null, profile);
    //});
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") });

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

//app.use('/recipes', require('./routes/recipesRoute'));

//app.use('/users', require('./routes/usersRoute'));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});