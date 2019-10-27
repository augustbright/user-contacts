const express = require('express');
const api = require('./routes/api');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const {auth, onlyForAuthenticated, initApp} = require('./routes/auth');

const {PORT} = process.env;
const app = express();
initApp(app);

// ROUTING
app.use(bodyParser.json());
app.use('/api', onlyForAuthenticated, api);
app.use('/auth', auth);

const guestProxyMiddleware = proxy(['/'], {
    target: process.env.DEV_AUTH_SERVER_ADDRESS
});
const guestStaticMiddleware = express.static('./auth');
const proxyMiddleware = proxy(['/'], {
    target: process.env.DEV_CLIENT_SERVER_ADDRESS
});
const staticMiddleware = express.static('./client');

app.use((req, res, next) => {
    if (process.env.MODE === 'DEVELOPMENT') {
        if (req.user) {
            proxyMiddleware(req, res, next);
        } else {
            guestProxyMiddleware(req, res, next);
        }
    } else {
        if (req.user) {
            staticMiddleware(req, res, next);
        } else {
            guestStaticMiddleware(req, res, next);
        }
    }
});

// START SERVER
app.listen(PORT, error => {
    if (error) {
        console.error(`Couldn't start application`, error);
    } else {
        console.log(`Application listening on port ${PORT}`);
    }
});