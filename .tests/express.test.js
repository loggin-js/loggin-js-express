const express = require('express');
const logginMW = require('../index.js');

const loggerMw = logginMW.logger({
  color: true,
  showRaw: false,
  channel: 'my-app',
  ignore(req, res) {
    return false;
  }
});

const loggerErrorMw = logginMW.errorLogger({
  color: true,
  channel: 'my-app',
});

const app = express();
app.use(loggerMw);


app.get('/hello', function (req, res) {
  res.logger.debug('Logger from within the response!');
  res.send({
   message: 'Hello world!'
  });
});

app.use(function(req, res, next) {
  res.status(404).send("Route not found!");
  next('Route not found!');
});
app.use(loggerErrorMw);

app.listen(5000, () => {
  console.log("Listening at port: 4000");
});