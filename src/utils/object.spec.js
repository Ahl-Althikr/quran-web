import * as obj from './object'

describe('utils/object', () => {
  test('sizeof', () => {
    const actual = obj.sizeof({ a: 1, b: 2 })
    const expected = 2

    expect(actual).toBe(expected)
  })

  test('sizeof (not object)', () => {
    expect(() => {
      obj.sizeof('')
    }).toThrowError(/ParameterError/)
  })

  test('toObject', () => {
    const actual = obj.toObject(['a', 'b', 'c'])
    const expected = { 0: 'a', 1: 'b', 2: 'c' }

    expect(actual).toEqual(expected)
  })

  test('toObject (not array)', () => {
    expect(() => {
      obj.toObject('')
    }).toThrowError(/ParameterError/)
  })

  test('toObject with selector', () => {
    const actual = obj.toObject(['a', 'b', 'c'], (item) => ({ key: item }))
    const expected = { a: 'a', b: 'b', c: 'c' }

    expect(actual).toEqual(expected)
  })

  test('toObject (selector not function)', () => {
    expect(() => {
      obj.toObject({}, '')
    }).toThrowError(/ParameterError/)
  })

  test('map', () => {
    const actual = obj.map({ a: 1, b: 2, c: 3 }, (key, value) => value * 2)
    const expected = [2, 4, 6]

    expect(actual).toEqual(expected)
  })

  test('map (not object)', () => {
    expect(() => {
      obj.map('')
    }).toThrowError(/ParameterError/)
  })

  test('map (selector not function)', () => {
    expect(() => {
      obj.map({}, '')
    }).toThrowError(/ParameterError/)
  })

  test('map with preserve', () => {
    const actual = obj.map(
      { a: 1, b: 2, c: 3 },
      (key, value) => value * 2,
      true
    )
    const expected = { a: 2, b: 4, c: 6 }

    expect(actual).toEqual(expected)
  })

  test('map (preserve not boolean)', () => {
    expect(() => {
      obj.map({}, undefined, '')
    }).toThrowError(/ParameterError/)
  })

  test('reducer', () => {
    const actual = obj.reduce(
      { a: 1, b: 2, c: 3 },
      (total, key, value) => total + value,
      0
    )
    const expected = 6

    expect(actual).toBe(expected)
  })

  test('reduce (not object)', () => {
    expect(() => {
      obj.reduce('')
    }).toThrowError(/ParameterError/)
  })

  test('reduce to object', () => {
    const actual = obj.reduce(
      { a: 1, b: 2, c: 3 },
      (object, key, value) => ({ ...object, [key]: value * 2 }),
      {}
    )
    const expected = { a: 2, b: 4, c: 6 }

    expect(actual).toEqual(expected)
  })

  test('reduce (selector not function)', () => {
    expect(() => {
      obj.reduce({}, '')
    }).toThrowError(/ParameterError/)
  })

  test('sum', () => {
    const actual = obj.sum({ a: 5, b: 22, c: 34 })
    const expected = 61

    expect(actual).toBe(expected)
  })

  test('sum (not object)', () => {
    expect(() => {
      obj.sum('')
    }).toThrowError(/ParameterError/)
  })

  test('sum with initial', () => {
    const actual = obj.sum({ a: 10, b: 20, c: 30 }, { initial: 5 })
    const expected = 65

    expect(actual).toBe(expected)
  })

  test('sum (initial not number)', () => {
    expect(() => {
      obj.sum({}, { initial: '' })
    }).toThrowError(/ParameterError/)
  })

  test('sum with reducer', () => {
    const actual = obj.sum(
      { a: { value: 3 }, b: { value: 45 }, c: { value: 4 } },
      { reducer: (prop) => prop.value }
    )
    const expected = 52

    expect(actual).toBe(expected)
  })

  test('sum (reducer not function)', () => {
    expect(() => {
      obj.sum({}, { reducer: '' })
    }).toThrowError(/ParameterError/)
  })

  test('forEach', () => {
    const mockFunc = jest.fn()

    obj.forEach({ a: 1, b: 2, c: 3 }, mockFunc)

    expect(mockFunc).toBeCalledTimes(3)
  })

  test('forEach (not object)', () => {
    expect(() => {
      obj.forEach('')
    }).toThrowError(/ParameterError/)
  })

  test('forEach (reducer not function)', () => {
    expect(() => {
      obj.forEach({}, '')
    }).toThrowError(/ParameterError/)
  })

  test('filter', () => {
    const actual = obj.filter({ a: 1, b: 2, c: 3 }, ['b'])
    const expected = { b: 2 }

    expect(actual).toEqual(expected)
  })

  test('filter (not object)', () => {
    expect(() => {
      obj.filter('')
    }).toThrowError(/ParameterError/)
  })

  test('filter (removeIds not array)', () => {
    expect(() => {
      obj.filter({}, '')
    }).toThrowError(/ParameterError/)
  })

  test('filter (removeIds not array of strings|numbers)', () => {
    expect(() => {
      obj.filter({}, [{}])
    }).toThrowError(/ParameterError/)
  })

  test('filter (removeIds not function)', () => {
    expect(() => {
      obj.filter({}, '')
    }).toThrowError(/ParameterError/)
  })

  test('filter with function', () => {
    const actual = obj.filter(
      { a: 1, b: 2, c: 3 },
      (key, value) => value % 2 === 0
    )
    const expected = { b: 2 }

    expect(actual).toEqual(expected)
  })

  test('remove', () => {
    const actual = obj.remove({ a: 1, b: 2, c: 3 }, 'b')
    const expected = { a: 1, c: 3 }

    expect(actual).toEqual(expected)
  })

  test('remove (not object)', () => {
    expect(() => {
      obj.remove('')
    }).toThrowError(/ParameterError/)
  })

  test('remove with array', () => {
    const actual = obj.remove({ a: 1, b: 2, c: 3 }, ['a', 'c'])
    const expected = { b: 2 }

    expect(actual).toEqual(expected)
  })

  test('remove with function', () => {
    const actual = obj.remove(
      { a: 1, b: 2, c: 3 },
      (key, value) => value % 2 === 0
    )
    const expected = { a: 1, c: 3 }

    expect(actual).toEqual(expected)
  })

  test('some', () => {
    const actual = obj.some(
      { a: 1, b: 2, c: 3 },
      (key, value) => value % 2 === 0
    )
    const expected = true

    expect(actual).toBe(expected)
  })

  test('some (not object)', () => {
    expect(() => {
      obj.some('')
    }).toThrowError(/ParameterError/)
  })

  test('some failure', () => {
    const actual = obj.some({ a: 1, b: 2, c: 3 }, (key, value) => value > 4)
    const expected = false

    expect(actual).toBe(expected)
  })

  test('clean', () => {
    const actual = obj.clean({ a: 1, b: undefined, c: 2 })
    const expected = { a: 1, c: 2 }

    expect(actual).toEqual(expected)
  })

  test('clean (not object)', () => {
    expect(() => {
      obj.clean('')
    }).toThrowError(/ParameterError/)
  })

  test('includesValue (passes)', () => {
    const actual = obj.includesValue({ a: 1, b: 2 }, 2)
    const expected = true

    expect(actual).toBe(expected)
  })

  test('includesValue (fails)', () => {
    const actual = obj.includesValue({ a: 1, b: 2 }, 3)
    const expected = false

    expect(actual).toBe(expected)
  })

  test('includesValue (no value fails)', () => {
    const actual = obj.includesValue({})
    const expected = false

    expect(actual).toBe(expected)
  })

  test('includesValue (not object)', () => {
    expect(() => {
      obj.includesValue('')
    }).toThrowError(/ParameterError/)
  })

  test('includesKey (passes)', () => {
    const actual = obj.includesKey({ a: 1, b: 2 }, 'a')
    const expected = true

    expect(actual).toBe(expected)
  })

  test('includesKey (key as number)', () => {
    const actual = obj.includesKey({ 1: 'a', 2: 'c' }, 1)
    const expected = true

    expect(actual).toBe(expected)
  })

  test('includesKey (fails)', () => {
    const actual = obj.includesKey({ a: 1, b: 2 }, 'c')
    const expected = false

    expect(actual).toBe(expected)
  })

  test('includesKey (key as number fails)', () => {
    const actual = obj.includesKey({ 1: 'a', 2: 'c' }, 3)
    const expected = false

    expect(actual).toBe(expected)
  })

  test('includesKey (not object)', () => {
    expect(() => {
      obj.includesKey('')
    }).toThrowError(/ParameterError/)
  })

  test('includesKey (not string|number)', () => {
    expect(() => {
      obj.includesKey({}, {})
    }).toThrowError(/ParameterError/)
  })
})
