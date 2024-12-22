const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { gamesRouter } = require('./routes/games');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

console.log('GoogleStrategy:', GoogleStrategy);

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/redirect/google',
    scope: ['profile', 'email'],
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('Access Token:', accessToken);
    console.log('Refresh:', refreshToken);
    console.log('Profile:', profile);
  },
));

const app = express();

const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

app.use(express.static(DIST_DIR));


// Routers
app.use('/api/games', gamesRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/game-nights', gameNightsRouter);

/**
 * If React-Router sends a request for a particular webpage, send the index.html in response
 */

app.get('/login/google', passport.authenticate('google'));

app.get('/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: 'login',
}), (req, res) => {
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: DIST_DIR });
});

module.exports = {
  app,
};
