import logger, { LoggerOut } from '../src/logger'

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

const out = new TestOut()
logger.out = out

describe('Logger#formatDate()', () => {
  beforeAll(() => {
    logger.config = {
      dateTime: true,
    }
  })

  test('2022/09/09 09:09:09', () => {
    logger.dateTimeGenerator = () => date9
    logger.log('Test')
    expect(out.result).toBe('2022/09/09 09:09:09 [Log] Test')
  })

  test('2022/10/10 10:10:10', () => {
    logger.dateTimeGenerator = () => date10
    logger.log('Test')
    expect(out.result).toBe('2022/10/10 10:10:10 [Log] Test')
  })
})

describe('Logger#debug(), log(), info(), warn(), error()', () => {
  beforeAll(() => {
    logger.config = {
      info: 'green',
      warn: 'yellow',
      error: 'red',
    }
  })

  test('debug()', () => {
    logger.debug('Test')
    expect(out.result).toBe('[Debug] Test')
  })

  test('log()', () => {
    logger.log('Test')
    expect(out.result).toBe('[Log] Test')
  })

  test('info()', () => {
    logger.info('Test')
    expect(out.result).toBe('[Info] \x1b[32mTest\x1b[39m')
  })

  test('warn()', () => {
    logger.warn('Test')
    expect(out.result).toBe('[Warn] \x1b[33mTest\x1b[39m')
  })

  test('error()', () => {
    logger.error('Test')
    expect(out.result).toBe('[Error] \x1b[31mTest\x1b[39m')
  })
})
