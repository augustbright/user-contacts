const express = require('express');
const api = require('./routes/api');
const bodyParser = require('body-parser');
const {auth, onlyForAuthenticated, initApp} = require('./routes/auth');
const path = require('path');

const {PORT} = process.env;
const app = express();
initApp(app);

// ROUTING
app.use(bodyParser.json());
app.use('/api', onlyForAuthenticated, api);
app.use('/auth', auth);

// dev proxies
let guestProxyMiddleware, proxyMiddleware;
if (process.env.MODE === 'DEVELOPMENT') {
    const proxy = require('http-proxy-middleware');
    guestProxyMiddleware = proxy(['/'], {
        target: process.env.DEV_AUTH_SERVER_ADDRESS
    });
    proxyMiddleware = proxy(['/'], {
        target: process.env.DEV_CLIENT_SERVER_ADDRESS
    });        
}

// prod statics
const guestStaticMiddleware = express.static('./auth/build');
const staticMiddleware = express.static('./client/build');

// Use proxy for development & static for production
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

app.get('*', (req, res) => {
    if (process.env.MODE !== 'DEVELOPMENT') {
        if (req.user) {
            res.sendFile(path.join(__dirname, 'client/build/index.html'));
        } else {
            res.sendFile(path.join(__dirname, 'auth/build/index.html'));
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