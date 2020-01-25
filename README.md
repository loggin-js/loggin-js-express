# loggin-js-express <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![NPM quality][code-quality-badge]][code-quality-link]
[![Downloads][downloads-badge]][downloads-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-link]

<!-- Links -->
[npm-image]: https://img.shields.io/npm/v/loggin-js-express.svg?style=flat-square
[npm-url]: https://npmjs.org/package/loggin-js-express

[travis-image]: https://img.shields.io/travis/nombrekeff/loggin-js-express.svg?style=flat-square
[travis-url]: https://travis-ci.org/nombrekeff/loggin-js-express

[code-quality-badge]: http://npm.packagequality.com/shield/loggin-js-express.svg?style=flat-square
[code-quality-link]: https://packagequality.com/#?package=loggin-js-express

[downloads-badge]: https://img.shields.io/npm/dt/loggin-js-express.svg?style=flat-square
[downloads-link]: https://www.npmjs.com/package/loggin-js-express

[dependencies-badge]: https://img.shields.io/david/nombrekeff/loggin-js-express.svg?style=flat-square
[dependencies-link]: https://david-dm.org/nombrekeff/loggin-js-express?view=tree

[vulnerabilities-badge]: https://snyk.io/test/npm/loggin-js-express/badge.svg?style=flat-square
[vulnerabilities-link]: https://snyk.io/test/npm/loggin-js-express

<div align="center">

# Express middleware for [Loggin'JS](https://github.com/loggin-js/loggin-js) ![](https://img.shields.io/badge/PRs-welcome-green.svg) <!-- omit in toc -->

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-badge]][downloads-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-link]  
[![NPM quality][code-quality-badge]][code-quality-link]  
  
<p>
A little express middleware for <a href="https://github.com/loggin-js/loggin-js">Loggin'JS<a>
</p>
</div>

****

## Table Of Content <!-- omit in toc -->
- [Installing](#installing)
- [Importing](#importing)
- [Api](#api)
    - [.logger(opts)](#loggeropts)
    - [.errorLogger(opts)](#errorloggeropts)
- [Found a bug?](#found-a-bug)
- [Collaborating](#collaborating)

### Installing
* Install with npm
```bash
npm install loggin-js-express --save
```

### Importing
```javascript
// Require the logging library
const logging = require('loggin-js');

// Require the express middleware
const loggingMW = require('loggin-js-express');
```


### Api
##### .logger(opts)
To create a **loggin-js** middleware is as easy as calling the available `.logger` function. You can create a **default** one by calling it without any arguments, additionally it also accepts a set of **options** defined bellow, here is a usage example:
```js
const app = express();

app.use(logginMW.logger({
  color: true,
  loggers: [loggin.Loggers.ConsoleLogger]
}));

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
interface LoggerOptions = {
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

##### .errorLogger(opts)
To create an **ERROR** middleware is also really easy, just call `.errorLogger` instead. It accepts the same options as [`.logger`](#logger)
```js
const app = express();

app.get('/hello', function (req, res) {
  // Logger is attached to the response to lert you use it within the routes
  res.logger.debug('Logger from within the response!');

  res.send({
   message: 'Hello world!'
  });
});

// Notice it's placed after routes and other app.use calls
app.use(logginMW.errorLogger({
  color: true,
  loggers: [loggin.Loggers.ConsoleLogger]
}));
```
**Options:**  
**errorLogger** accepts an object containing some options, it extends options from [loggin.Loggers.Options](https://github.com/nombrekeff/loggin-js/wiki/Logger#loggingloggerslogger), and adds a couple of custom ones. 

```ts
interface ErrorLoggerOptions = {
  /* Loggin'JS Options */
  color?: boolean;                        // Should the logger be colored
  lineNumbers?: boolean;                  // Should the logger output line numbers
  level?: number|string|loggin.Severity;  // Set the logger level
  channel?: string;                       // Set the channel for the logger, defaults to filename
  formatter: string;                      // Set the logger formatter
  
  /* Custom Options */
  loggers: loggin.Loggers.Logger[];       // List of loggers to pack
  msg: string|function;                   // Template or function to get the log message
  showRaw?: boolean;                      // Show raw request
  ignore?(req, res): boolean;             // Ignore routes
}
```

### Found a bug?
If you found a **bug** or like to leave a **feature request**, please [leave an issue](https://github.com/nombrekeff/loggin-js-express/issues/new/choose) and we will take care of it.
> Just make sure it's not already filed.


### Collaborating
Hi there, if you like the project don't hesitate in collaborating (_if you like to_), submit a pull request, post an issue, ...   
Any **help** or **ideas** are apreciated!
