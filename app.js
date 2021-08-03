const express = require('express');

const taskRouter = require('./routers/task-router');

// Create Express server.
const bodyParser = require('body-parser');
const app = express();

// Setup express
app.set(process.env.PORT, 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization ,Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes
taskRouter.startRouting(app);

// Start Express server
app.listen(process.env.PORT || 5000, () => {
    console.log('%s App is running at http://localhost:%d in %s mode', '-', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
  
module.exports = app;