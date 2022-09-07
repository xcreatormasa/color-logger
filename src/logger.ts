export type LogLevel = 'debug' | 'log' | 'info' | 'warn' | 'error'

const toFirstLetterUpper = (str: LogLevel) => str[0].toUpperCase() + str.slice(1)

export interface LoggerOut {
  debug: (message: string) => void
  log: (message: string) => void
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
}

export class Logger {
  out: LoggerOut

  constructor(out: LoggerOut = console) {
    this.out = out
  }

  now(): Date {
    return new Date()
  }

  static formatDate(date: Date): string {
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

  static toLogString(date: Date, logLevel: LogLevel, message: string) {
    return `${this.formatDate(date)} [${toFirstLetterUpper(logLevel)}] ${message}`
  }

  debug(message: string) {
    this.out.debug(Logger.toLogString(this.now(), 'debug', message))
  }

  log(message: string) {
    this.out.log(Logger.toLogString(this.now(), 'log', message))
  }

  info(message: string) {
    this.out.info(Logger.toLogString(this.now(), 'info', message))
  }

  warn(message: string) {
    this.out.warn(Logger.toLogString(this.now(), 'warn', message))
  }

  error(message: string) {
    this.out.error(Logger.toLogString(this.now(), 'error', message))
  }
}

const logger = new Logger()

export default logger
