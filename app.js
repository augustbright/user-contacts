const express = require('express');
const api = require('./routes/api');
const bodyParser = require('body-parser');
const {auth, onlyForAuthenticated, initApp} = require('./routes/auth');

const {PORT} = process.env;
const app = express();
initApp(app);

// ROUTING
app.use(bodyParser.json());
app.use('/api', onlyForAuthenticated, api);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Hello!');
});

// START SERVER
app.listen(PORT, error => {
    if (error) {
        console.error(`Couldn't start application`, error);
    } else {
        console.log(`Application listening on port ${PORT}`);
    }
});