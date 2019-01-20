# express-loggin-js <!-- omit in toc -->

## Table Of Content <!-- omit in toc -->
- [Get Started](#get-started)
- [Importing](#importing)
- [Api](#api)
    - [.logger()](#logger)
    - [.errorLogger()](#errorlogger)

### Get Started
* Install with npm
```bash
npm install express-loggin-js --save
```

### Importing
```javascript
// Require the logging library
const logging = require('loggin-js');

// Require the express middleware
const loggingMW = require('express-loggin-js');
```


### Api
##### .logger()
The fastest way of adding a logger would be to create a logger middleware, it accepts some options defined below.
```js
const app = express();

const loggerMw = logginMW.logger({
  loggers: [loggin.Loggers.ConsoleLogger],
  color: true,
  msg: `{req.protocol} <%m{req.method}> <%gr{req.path}>`
});

app.use(loggerMw);

app.get('/hello', function (req, res) {
  
  // Logger is attached to the response to lert you use it within the routes
  res.logger.debug('Logger from within the response!');

  res.send({
   message: 'Hello world!'
  });
});
```
**Options:**  
**logger** accepts an object containing some options, it extends options from [loggin.Loggers.Options](https://github.com/nombrekeff/loggin-js/wiki/Logger#loggingloggerslogger), and adds a couple of custom ones. 

```ts
interface options = {
  /* Loggin'JS Options */
  color?: boolean;                        // Should the logger be colored
  lineNumbers?: boolean;                  // Should the logger output line numbers
  level?: number|string|loggin.Severity;  // Set the logger level
  channel?: string;                       // Set the channel for the logger, defaults to filename
  formatter: string;                      // Set the logger formatter
  
  /* Custom Options */
  loggers: loggin.Loggers.Logger[];       // List of loggers to pack
  msg: string|function;                   // Template or function to get the log message
  showRaw: boolean;                       // Show raw request
  ignore(req, res): boolean;              // Ignore routes
}
```



##### .errorLogger()
