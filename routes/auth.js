const express = require('express');
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const {getCollection} = require('../db');
const {ObjectID} = require('mongodb');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, SESSION_KEY } = process.env;
const auth = express.Router();

function initApp(app) {
    app.use(cookieSession({
        keys: [SESSION_KEY],
        maxAge: 1000 * 60 * 60 * 24
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());    
}

passport.use(new GoogleStategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    const users = await getCollection('users');
    const googleId = profile.id;
    const {displayName} = profile;
    const existingUser = await users.findOne({googleId});
    let user;

    if (existingUser) {
        user = existingUser;
    } else {
        const insertResult = await users.insertOne({googleId, displayName});
        user = await users.findOne({_id: insertResult.insertedId});
    }
    done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    const users = await getCollection('users');
    const user = await users.findOne({_id: ObjectID(userId)});

    done(null, user);
});

auth.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

auth.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

auth.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

auth.get('/current', (req, res) => {
    if (!req.user) {
        return res.json(null);
    }
    const {displayName, _id} = req.user;
    res.json({displayName, _id});
});

function onlyForAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401);
        res.send('This api is forbidden for unauthorised users');
    }
}

module.exports = {
    auth,
    initApp,
    onlyForAuthenticated
};
