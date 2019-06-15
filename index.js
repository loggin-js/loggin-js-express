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
  formatter: '[<%c{time.toLocaleString}>] - {severityStr} - {message} - {data}',
  msg: `<%m{req.method}> {req.protocol} <%gr{req.path}> @ <%c{req.connection.remoteAddress}> `,
  ignore(req, res) {
    return false;
  }
};

const defaultErrorLoggerOptions = {
  ...defaultLoggerOptions,
  msg: `<%m{req.method}> {req.protocol} <%gr{req.path}>: <%r{res.statusCode}> <%r{err}>`
};

const constructLogger = (opts = {}) => {
  if (typeof opts.msg !== 'string' && typeof opts.msg !== 'function') {
    throw new Error('opts.msg must be a string or a function');
  }

  return loggin.logger(opts);
};

const constructMidleware = (logger, opts) => {
  return (...args) => {
    opts = {
      ...defaultLoggerOptions,
      ...opts
    };

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

    logger.log(msg, null, {
      severity: opts.severity,
      channel: logger.options.channel,
      time: Date.now(),
      user: logger.options.user
    });
    next();
  }
};

const logginExpress = {
  logger(opts = {}, premadeLogger) {
    opts = {
      ...defaultLoggerOptions,
      ...opts
    };

    let logger = premadeLogger || constructLogger(opts);
    let mw = (req, res, next) =>
      constructMidleware(logger, opts)(req, res, next);

    mw.logger = logger;
    return mw;
  },
  errorLogger(opts = {}, premadeLogger) {
    opts = {
      ...defaultErrorLoggerOptions,
      ...opts
    };

    let logger = premadeLogger || constructLogger({ ...opts });
    return (err, req, res, next) =>
      constructMidleware(logger, opts)(err, req, res, next);
  },
  constructMidleware,
  constructLogger,
  cleanRequest
};

module.exports = logginExpress;