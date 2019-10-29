//setup babel
require('ignore-styles');
require('@babel/register')({
    ignore: [/build/, /node_modules/],
    presets: ['@babel/preset-env', '@babel/preset-react']
});
require('@babel/polyfill');

const express = require('express');
const api = require('./routes/api');
const bodyParser = require('body-parser');
const { auth, onlyForAuthenticated, initApp } = require('./routes/auth');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const { default: createStore } = require('./src/redux/index');
const { default: App } = require('./src/components/App');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router-dom');
const contactsBL = require('./bl/contacts');

const { PORT } = process.env;
const app = express();
initApp(app);

// ROUTING
app.use(bodyParser.json());
app.use('/api', onlyForAuthenticated, api);
app.use('/auth', auth);

// dev proxies
let guestProxyMiddleware, proxyMiddleware;
if (process.env.NODE_ENV === 'development') {
    const proxy = require('http-proxy-middleware');
    guestProxyMiddleware = proxy(['/'], {
        target: process.env.DEV_AUTH_SERVER_ADDRESS
    });
    proxyMiddleware = (proxy(['/'], {
        target: process.env.DEV_CLIENT_SERVER_ADDRESS
    }));
}

// prod statics
const guestStaticMiddleware = express.static('./auth/build');
const staticMiddleware = express.static('./build');

// Use proxy for development & static for production
app.use(async (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        if (req.user) {
            proxyMiddleware(req, res, next);
        } else {
            guestProxyMiddleware(req, res, next);
        }
    } else {
        if (req.user) {
            //ssr
            const filePath = path.resolve(path.join('./', 'build', req.path));
            const pathStat = await promisify(fs.stat)(filePath);
            const fileExists = pathStat.isFile();
            const indexPath = path.join(__dirname, 'build/index.html');
            if (!fileExists) {
                const htmlContent = await promisify(fs.readFile)(indexPath, 'utf-8');
                const store = createStore({
                    userInfo: {
                        _id: req.user._id,
                        displayName: req.user.displayName
                    },
                    contacts: await contactsBL.getAll(req.user._id)
                });

                const appElement = React.createElement(Provider, { store },
                    React.createElement(StaticRouter, null,
                        React.createElement(App)));
                return res.send(
                    htmlContent
                        .replace(/\{\{SSR\}\}/, ReactDOMServer.renderToString(appElement))
                        .replace(/\{STATE_FROM_SERVER:"STATE_FROM_SERVER"\}/, JSON.stringify(store.getState()))
                );
            }
            staticMiddleware(req, res, next);
        } else {
            guestStaticMiddleware(req, res, next);
        }
    }
});

app.get('*', (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
        if (req.user) {
            res.sendFile(path.join(__dirname, 'build/index.html'));
        } else {
            res.sendFile(path.join(__dirname, 'auth/build/index.html'));
        }
    }
});

// app.use(async (req, res) => {
//     if (!req.user) {
//         return;
//     }

//     const store = createStore({
//         userInfo: {
//             _id: req.user._id,
//             displayName: req.user.displayName
//         },
//         contacts: await contactsBL.getAll(req.user._id)
//     });

//     res.send(JSON.stringify(store.getState(), null, 3));
// });


// START SERVER
app.listen(PORT, error => {
    if (error) {
        console.error(`Couldn't start application`, error);
    } else {
        console.log(`Application listening on port ${PORT}`);
    }
});