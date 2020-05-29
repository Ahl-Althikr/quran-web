import * as guards from './guards'

describe('utils/guards', () => {
  test('isFunction', () => {
    const actual = guards.isFunction(() => {})
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isFunction class', () => {
    const actual = guards.isFunction(class {})
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isFunction function', () => {
    const actual = guards.isFunction(function () {})
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isFunction object', () => {
    const actual = guards.isFunction({})
    const expected = false

    expect(actual).toBe(expected)
  })

  test('isObject', () => {
    const actual = guards.isObject({})
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isObject date', () => {
    const actual = guards.isObject(new Date())
    const expected = false

    expect(actual).toBe(expected)
  })

  test('isNumber', () => {
    const actual = guards.isNumber(0)
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isNumber string', () => {
    const actual = guards.isNumber('0')
    const expected = false

    expect(actual).toBe(expected)
  })

  test('isString', () => {
    const actual = guards.isString('')
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isString number', () => {
    const actual = guards.isString(0)
    const expected = false

    expect(actual).toBe(expected)
  })

  test('isArray', () => {
    const actual = guards.isArray([])
    const expected = true

    expect(actual).toBe(expected)
  })

  test('isArray set', () => {
    const actual = guards.isArray(new Set())
    const expected = false

    expect(actual).toBe(expected)
  })
})
