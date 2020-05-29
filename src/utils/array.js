import { isFunction } from './guards'

/**
 * Get last element in array
 * @param {Array} array
 */
export const last = (array, defaultValue) => {
  const lastItem = array[array.length - 1]

  if (defaultValue !== undefined && lastItem === undefined) {
    return defaultValue
  }

  return lastItem
}

/**
 * Immutably insert item into array at given index
 * @param {Array} array
 * @param {Number} index
 * @param {*} value
 */
export const insert = (array, index = array.length, value) => {
  return [...array.slice(0, index), value, ...array.slice(index)]
}

export const update = (array, atIndex = array.length, update) => {
  return [
    ...array.slice(0, atIndex),
    isFunction(update) ? update(array[atIndex]) : update,
    ...array.slice(atIndex + 1),
  ]
}

/**
 * Remove section from array.
 * Opposite to the native slice method.
 * @param {Array} array
 * @param {Number} fromIndex
 * @param {Number} toIndex
 */
export const remove = (array, fromIndex, toIndex = fromIndex) => {
  if (fromIndex === undefined) {
    return array
  } else if (fromIndex === 0 && toIndex === 0) {
    return array.slice(fromIndex + 1)
  } else if (fromIndex < 0) {
    return array.slice(0, fromIndex)
  }

  return [...array.slice(0, fromIndex), ...array.slice(toIndex + 1)]
}

/**
 * Returns array with no duplicate values
 * @param {Array} array
 */
export const unique = (array) => {
  return [...new Set(array)]
}

/**
 * Returns array with no duplicate values (case sensitive)
 * @param {Array} array
 */
export const uniqueCaseInsensitive = (array) => {
  const exlucde = {}

  return array.filter((el) => {
    const elLowerCase = el.toLowerCase()

    if (!exlucde[elLowerCase]) {
      exlucde[elLowerCase] = true
      return true
    }

    return false
  })
}

/**
 * Return first child array's second element
 * where child array's first element evalutates to true.
 * Child arrays with one element gets automatically resolved
 * when hit in the for loop. In other words, [value] is equivelant
 * to [true, value].
 *
 * Example: message will resolve to 'Count is 2'
 *
 * count = 2
 * message = boolSwtich([
 *      [count === 1, 'Count is 1'],
 *      [count === 2, 'Count is 2'],
 *      ['Unkowing Count']
 * ])
 *
 * @param {Array} array array of tuples containing condition and value
 */
export const boolSwitch = (array) => {
  const arraySize = array.length

  for (let i = 0; i < arraySize; i++) {
    const element = array[i]
    const elementSize = element.length

    if (elementSize === 1) {
      const [value] = element

      return typeof value === 'function' ? value() : value
    } else if (elementSize === 2) {
      const [condition, value] = element

      if (condition) {
        return typeof value === 'function' ? value() : value
      }
    }
  }
}

/**
 * Chunk array into sub arrays of given size
 *
 * Ex.
 *
 * chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
 * chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * @param {Array} array array to chunk
 * @param {Number} size chunk size
 */
export const chunk = (array, size) => {
  const chunked_arr = []

  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1]
    if (!last || last.length === size) {
      chunked_arr.push([array[i]])
    } else {
      last.push(array[i])
    }
  }

  return chunked_arr
}

/**
 * Find power-set of a set using BITWISE approach.
 * @param {*[]} originalSet
 * @return {*[][]}
 */
export const powerSet = (array, maxCombinatons) => {
  const subSets = []

  // We will have 2^n possible combinations (where n is a length of original set).
  // It is because for every element of original set we will decide whether to include
  // it or not (2 options for each set element).
  const numberOfCombinations = 2 ** array.length
  const subSetsSize = maxCombinatons
    ? Math.min(numberOfCombinations, maxCombinatons)
    : numberOfCombinations

  // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
  // it shows by its bits (0 or 1) whether to include related element from the set or not.
  // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
  // include only "2" to the current set.
  for (
    let combinationIndex = 0;
    combinationIndex < subSetsSize;
    combinationIndex++
  ) {
    const subSet = []

    for (
      let setElementIndex = 0;
      setElementIndex < array.length;
      setElementIndex++
    ) {
      // Decide whether we need to include current element into the subset or not.
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(array[setElementIndex])
      }
    }

    // Add current subset to the list of all subsets.
    subSets.push(subSet)
  }

  return subSets
}

/**
 * Get permutation of array.
 * That is all possible orders of array.
 * @param {Array} array
 */
export const permutations = (array) => {
  if (array.length === 0) {
    return [[]]
  }

  const result = []

  for (let i = 0; i < array.length; i++) {
    const copy = array.slice()
    const head = copy.splice(i, 1)
    const rest = permutations(copy)

    for (let j = 0; j < rest.length; j++) {
      const next = head.concat(rest[j])
      result.push(next)
    }
  }

  return result
}
