const loggin = require('loggin-js');
const format = require('string-format');

const cleanRequest = (req_) => {
  let {
    _readableState,
    readable,
    _events,
    _eventsCount,
    socket,
    app,
    req,
    res,
    client,
    connection,
    httpVersionMajor,
    httpVersionMinor,
    httpVersion,
    complete,
    rawHeaders,
    trailers,
    rawTrailers,
    aborted,
    upgrade,
    _consuming,
    _dumped,
    _parsedUrl,
    ...rest
  } = req_;
  return rest;
}


const defaultLoggerOptions = {
  severity: loggin.Severity.DEBUG,
  formatter: '[<%c{time.toLocaleString}>] - {severityStr} - {message} - {data}',
  showRaw: false,
  loggers: [loggin.Loggers.ConsoleLogger],
  msg: `<%m{req.method}> {req.protocol} <%gr{req.path}> @ <%c{req.ip}> `,
  ignore(req, res) {
    return false;
  }
};

const defaultErrorLoggerOptions = {
  ...defaultLoggerOptions,
  severity: loggin.Severity.ERROR,
  msg: `<%m{req.method}> {req.protocol} <%gr{req.path}>: <%r{res.statusCode}> <%r{err}>`
};

const constructLogger = (opts = {}) => {
  if (typeof opts.msg !== 'string' && typeof opts.msg !== 'function') {
    throw new Error('opts.msg must be a string or a function');
  }

  let loggers = [];
  for (let LoggerConstructor of opts.loggers) {
    loggers.push(new LoggerConstructor(opts));
  }

  return loggin.join(loggers, opts);
};

const constructMidleware = (opts = {}, logger) => {
  return (...args) => {
    if (opts.ignore(...args)) next();

    let next;
    let msgData = {};

    if (args.length === 3) {
      args[1].logger = logger;
      next = args[2];
      msgData = {
        req: args[0],
        res: args[1],
      };

    } else if (args.length === 4) {
      next = args[3];
      msgData = {
        err: args[0],
        req: args[1],
        res: args[2],
      }
    }

    let message = '';
    if (typeof opts.msg === 'string') {
      // console.log(msgData);
      message = format(opts.msg, msgData);
    } else if (typeof opts.msg === 'function') {
      message = opts.msg(...args);
    }

    let msg = message;
    if (opts.showRaw) {
      let cleanReq = cleanRequest(msgData.req);
      msg = message + ' - ' + JSON.stringify(cleanReq, null, 2);
    }

    logger.log(msg, null, opts.severity, logger.channel, Date.now(), logger.user);
    next();
  }
};

const logginExpress = {
  logger(opts = {}) {
    opts = {
      ...defaultLoggerOptions,
      ...opts
    };

    let logger = constructLogger({...opts});
    return (req, res, next) =>
      constructMidleware(opts, logger)(req, res, next);
  },
  errorLogger(opts = {}) {
    opts = {
      ...defaultErrorLoggerOptions,
      ...opts
    };

    let logger = constructLogger({...opts});

    return (err, req, res, next) =>
      constructMidleware(opts, logger)(err, req, res, next);
  }
};

module.exports = logginExpress;