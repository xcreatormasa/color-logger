export type LogLevel = 'debug' | 'log' | 'info' | 'warn' | 'error'

export type LogColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'

export type LoggerConfig = {
  dateTime?: boolean
  debug?: LogColor
  log?: LogColor
  info?: LogColor
  warn?: LogColor
  error?: LogColor
}

export type LogDateTimeGenerator = () => Date

export type LoggerOut = {
  debug: (message: string) => void
  log: (message: string) => void
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
}

const escapeCharacters = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  resetColor: '\x1b[39m',
  resetAll: '\x1b[0m',
  blackBg: '\x1b[40m',
  redBg: '\x1b[41m',
  greenBg: '\x1b[42m',
  yellowBg: '\x1b[43m',
  blueBg: '\x1b[44m',
  magentaBg: '\x1b[45m',
  cyanBg: '\x1b[46m',
  whiteBg: '\x1b[47m',
  resetBg: '\x1b[49m',
  bold: '\x1b[1m',
  thin: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  blinkFast: '\x1b[6m',
  invert: '\x1b[7m',
  hidden: '\x1b[37m',
  strikeOut: '\x1b[0m',
}

const toFirstLetterUpper = (str: LogLevel) => str[0].toUpperCase() + str.slice(1)

class Logger {
  static defaultConfig: LoggerConfig = {
    info: 'green',
    warn: 'yellow',
    error: 'red',
  }

  config = Logger.defaultConfig
  dateTimeGenerator: LogDateTimeGenerator = () => new Date()
  out: LoggerOut

  constructor(out: LoggerOut = console) {
    this.out = out
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = 1 + date.getMonth() // getMonth() returns 0 for January
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()

    const yearStr = String(year)
    const monthStr = `${month <= 9 ? '0' : ''}${month}`
    const dayStr = `${day <= 9 ? '0' : ''}${day}`
    const hourStr = `${hour <= 9 ? '0' : ''}${hour}`
    const minStr = `${min <= 9 ? '0' : ''}${min}`
    const secStr = `${sec <= 9 ? '0' : ''}${sec}`

    return `${yearStr}/${monthStr}/${dayStr} ${hourStr}:${minStr}:${secStr}`
  }

  private toLogString(logLevel: LogLevel, message: unknown) {
    let escapeChar = ''
    let resetChar = ''
    const color = this.config[logLevel]
    if (color) {
      escapeChar = escapeCharacters[color]
      resetChar = escapeCharacters.resetColor
    }

    let result = ''
    if (this.config.dateTime) result += this.formatDate(this.dateTimeGenerator()) + ' '
    result += `[${toFirstLetterUpper(logLevel)}] `
    result += escapeChar
    result += String(message)
    result += resetChar
    return result
  }

  debug(message: unknown) {
    this.out.debug(this.toLogString('debug', message))
  }

  log(message: unknown) {
    this.out.log(this.toLogString('log', message))
  }

  info(message: unknown) {
    this.out.info(this.toLogString('info', message))
  }

  warn(message: unknown) {
    this.out.warn(this.toLogString('warn', message))
  }

  error(message: unknown) {
    this.out.error(this.toLogString('error', message))
  }
}

const logger = new Logger()

export default logger
