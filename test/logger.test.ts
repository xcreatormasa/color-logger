import { LoggerOut, Logger } from '../src/logger'

const september = 8
const date9 = new Date(2022, september, 9, 9, 9, 9)

const october = 9
const date10 = new Date(2022, october, 10, 10, 10, 10)

class TestOut implements LoggerOut {
  result = ''

  debug(message: string) {
    this.result = message
  }

  log(message: string) {
    this.result = message
  }

  info(message: string) {
    this.result = message
  }

  warn(message: string) {
    this.result = message
  }

  error(message: string) {
    this.result = message
  }
}

class TestLogger extends Logger {
  override now(): Date {
    return date10
  }
}

describe('Logger#formatDate()', () => {
  test('2022/09/09 09:09:09', () => {
    expect(Logger.formatDate(date9)).toBe('2022/09/09 09:09:09')
  })

  test('2022/10/10 10:10:10', () => {
    expect(Logger.formatDate(date10)).toBe('2022/10/10 10:10:10')
  })
})

describe('Logger#toLogString()', () => {
  test('Info', () => {
    expect(Logger.toLogString(date9, 'info', 'This is info message.')).toBe(
      '2022/09/09 09:09:09 [Info] This is info message.',
    )
  })

  test('Error', () => {
    expect(Logger.toLogString(date10, 'error', 'This is error message.')).toBe(
      '2022/10/10 10:10:10 [Error] This is error message.',
    )
  })
})

describe('Logger#debug(), log(), info(), warn(), error()', () => {
  const out = new TestOut()
  const logger = new TestLogger(out)

  test('debug()', () => {
    logger.debug('This is debug message.')
    expect(out.result).toBe('2022/10/10 10:10:10 [Debug] This is debug message.')
  })

  test('log()', () => {
    logger.log('This is log message.')
    expect(out.result).toBe('2022/10/10 10:10:10 [Log] This is log message.')
  })

  test('info()', () => {
    logger.info('This is info message.')
    expect(out.result).toBe('2022/10/10 10:10:10 [Info] This is info message.')
  })

  test('warn()', () => {
    logger.warn('This is warn message.')
    expect(out.result).toBe('2022/10/10 10:10:10 [Warn] This is warn message.')
  })

  test('error()', () => {
    logger.error('This is error message.')
    expect(out.result).toBe('2022/10/10 10:10:10 [Error] This is error message.')
  })
})
