import * as keys from './keys'

describe('utils/keys', () => {
  test('typeToDefault', () => {
    const actual = keys.typeToDefault('option')
    const expected = 'alt'

    expect(actual).toBe(expected)
  })

  test('keyToType', () => {
    const actual = keys.keyToType(40)
    const expected = 'down'

    expect(actual).toBe(expected)
  })

  test('isKey', () => {
    const event = new KeyboardEvent('keydown', { key: 'keydown' })
    const actual = keys.isKey(event, 'keydown')
    const expected = true

    expect(actual).toBe(expected)
  })

  test('onKey', () => {
    const event = new KeyboardEvent('keydown', { key: 'keydown' })
    const mockFunc = jest.fn()

    keys.onKey(event, {
      keydown: mockFunc,
    })

    expect(mockFunc).toBeCalledWith('keydown', 'keydown')
  })

  test('onKey fallback', () => {
    const event = new KeyboardEvent('keydown', { key: 'keydown' })
    const mockFunc = jest.fn()

    keys.onKey(event, {
      fallback: mockFunc,
    })

    expect(mockFunc).toBeCalledWith('keydown', 'keydown')
  })

  test('onKey return value', () => {
    const event = new KeyboardEvent('keydown', { key: 'keydown' })
    const actual = keys.onKey(event, { keydown: 1 })
    const expected = 1

    expect(actual).toBe(expected)
  })
})
