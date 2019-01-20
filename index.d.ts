// Type definitions for loggin-js

interface LoggerOptions {
  /* Loggin'JS Options */
  color?: boolean;                           // Should the logger be colored
  lineNumbers?: boolean;                     // Should the logger output line numbers
  level?: number | string | loggin.Severity; // Set the logger level
  channel?: string;                          // Set the channel for the logger, defaults to filename
  formatter: string;                         // Set the logger formatter

  /* Custom Options */
  loggers: loggin.Loggers.Logger[];          // List of loggers to pack
  msg: string | function;                    // Template or function to get the log message
  showRaw: boolean;                          // Show raw request
  ignore(req, res): boolean;                 // Ignore routes
}

/**
 * Returns a logger-js middleware
 * 
 * #### Example 1
 * In the following example it will return a FileLogger as pipes are passed
 * @example 
 * logger({ severity: 'DEBUG' });
 */
export function logger(opts: LoggerOptions): loggin.Loggers.LoggerPack;

/**
 * Returns a logger-js error middleware
 * 
 * #### Example 1
 * In the following example it will return a FileLogger as pipes are passed
 * @example 
 * errorLogger({ severity: 'DEBUG' });
 */
export function errorLogger(opts: LoggerOptions): loggin.Loggers.LoggerPack;
