const Express = require('express');
const app = new Express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, error => {
    if (error) {
        console.error(`Couldn't start application`, error);
    } else {
        console.log(`Application listening on port ${PORT}`);
    }
});