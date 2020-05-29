import * as array from './array'

describe('utils/array', () => {
  test('last', () => {
    const actual = array.last([1, 2, 3])
    const expected = 3

    expect(actual).toBe(expected)
  })

  test('insert', () => {
    const actual = array.insert([1, 2, 3], 2, 100)
    const expected = [1, 2, 100, 3]

    expect(actual).toEqual(expected)
  })

  test('insert without index', () => {
    const actual = array.insert([1, 2, 3], undefined, 100)
    const expected = [1, 2, 3, 100]

    expect(actual).toEqual(expected)
  })

  test('insert beginning', () => {
    const actual = array.insert([1, 2, 3], 0, 100)
    const expected = [100, 1, 2, 3]

    expect(actual).toEqual(expected)
  })

  test('insert negative', () => {
    const actual = array.insert([1, 2, 3], -1, 100)
    const expected = [1, 2, 100, 3]

    expect(actual).toEqual(expected)
  })

  test('insert (index > array.length)', () => {
    const actual = array.insert([1, 2, 3], 100, 100)
    const expected = [1, 2, 3, 100]

    expect(actual).toEqual(expected)
  })

  test('update', () => {
    const actual = array.update([1, 2, 3], 2, 100)
    const expected = [1, 2, 100]

    expect(actual).toEqual(expected)
  })

  test('update with function', () => {
    const actual = array.update([1, 2, 3], 2, (value) => value * 2)
    const expected = [1, 2, 6]

    expect(actual).toEqual(expected)
  })

  test('remove', () => {
    const actual = array.remove([1, 2, 3])
    const expected = [1, 2, 3]

    expect(actual).toEqual(expected)
  })

  test('remove from index', () => {
    const actual = array.remove([1, 2, 3], 1)
    const expected = [1, 3]

    expect(actual).toEqual(expected)
  })

  test('remove from index = 0', () => {
    const actual = array.remove([1, 2, 3], 0)
    const expected = [2, 3]

    expect(actual).toEqual(expected)
  })

  test('remove from to index', () => {
    const actual = array.remove([1, 2, 3], 1, 2)
    const expected = [1]

    expect(actual).toEqual(expected)
  })

  test('remove from negative index', () => {
    const actual = array.remove([1, 2, 3], -1)
    const expected = [1, 2]

    expect(actual).toEqual(expected)
  })

  test('remove from negative index to negative', () => {
    const actual = array.remove([1, 2, 3], -1, -1)
    const expected = [1, 2]

    expect(actual).toEqual(expected)
  })

  test('remove (from index > array.length)', () => {
    const actual = array.remove([1, 2, 3], 4)
    const expected = [1, 2, 3]

    expect(actual).toEqual(expected)
  })

  test('remove (to index > array.length)', () => {
    const actual = array.remove([1, 2, 3], 4, 6)
    const expected = [1, 2, 3]

    expect(actual).toEqual(expected)
  })

  test('unique', () => {
    const actual = array.unique([1, 2, 2, 3, 3, 3])
    const expected = [1, 2, 3]

    expect(actual).toEqual(expected)
  })

  test('unique strings', () => {
    const actual = array.unique(['a', 'a', 'A'])
    const expected = ['a', 'A']

    expect(actual).toEqual(expected)
  })

  test('uniqueCaseInsensitive', () => {
    const actual = array.uniqueCaseInsensitive(['a', 'a', 'A'])
    const expected = ['a']

    expect(actual).toEqual(expected)
  })

  test('boolSwitch former true', () => {
    const actual = array.boolSwitch([
      [true, 'true value'],
      [false, 'false value'],
      ['default value'],
    ])
    const expected = 'true value'

    expect(actual).toBe(expected)
  })

  test('boolSwitch latter true', () => {
    const actual = array.boolSwitch([
      [false, 'false value'],
      [true, 'true value'],
      ['default value'],
    ])
    const expected = 'true value'

    expect(actual).toBe(expected)
  })

  test('boolSwitch default', () => {
    const actual = array.boolSwitch([
      [false, 'false value 1'],
      [false, 'false value 2'],
      ['default value'],
    ])
    const expected = 'default value'

    expect(actual).toBe(expected)
  })

  test('boolSwitch first true', () => {
    const actual = array.boolSwitch([
      [true, 'true value 1'],
      [true, 'true value 2'],
      ['default value'],
    ])
    const expected = 'true value 1'

    expect(actual).toBe(expected)
  })

  test('boolSwitch early default', () => {
    const actual = array.boolSwitch([
      [false, 'false value'],
      ['default value'],
      [true, 'true value 1'],
      [true, 'true value 2'],
    ])
    const expected = 'default value'

    expect(actual).toBe(expected)
  })

  test('boolSwitch not resolved', () => {
    const actual = array.boolSwitch([[false, 'false value']])
    const expected = undefined

    expect(actual).toBe(expected)
  })

  test('chunk', () => {
    const actual = array.chunk([1, 2, 3, 4], 2)
    const expected = [
      [1, 2],
      [3, 4],
    ]

    expect(actual).toEqual(expected)
  })

  test('chunk odd array length even size', () => {
    const actual = array.chunk([1, 2, 3, 4, 5], 2)
    const expected = [[1, 2], [3, 4], [5]]

    expect(actual).toEqual(expected)
  })

  test('chunk even array length odd size', () => {
    const actual = array.chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ]

    expect(actual).toEqual(expected)
  })

  test('powerSet', () => {
    const actual = array.powerSet([1, 2, 3])
    const expected = [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

    expect(actual).toEqual(expected)
  })

  test('permutations', () => {
    const actual = array.permutations([1, 2, 3])
    const expected = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]

    expect(actual).toEqual(expected)
  })
})
