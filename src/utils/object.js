import { ParameterError } from 'errors'
import noop from 'lodash.noop'
import Types from 'utils/types'

/**
 * @param {Object} object
 * @return {Number} Number of items in object
 */
export const sizeof = (object) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }

  return Object.keys(object).length
}

/**
 * @param {Array} array
 * @param {Function} selector used to generate key and value for each array item
 * @return {Object} Array represented as an object
 */
export const toObject = (array, selector) => {
  if (!Array.isArray(array)) {
    throw new ParameterError(0, 'array', array)
  }
  if (typeof selector !== 'function' && selector !== undefined) {
    throw new ParameterError(1, 'function', selector)
  }

  return array.reduce((object, item, i) => {
    const { key = i, value = item } = selector ? selector(item, i) : {}

    object[key] = value

    return object
  }, {})
}

/**
 * @param {Object} object
 * @param {Function} reducer contains logic used to generate new value for each item
 * @param {Boolean} preserve whether to retrun an object (true) or an array (false)
 * @return {Array|Object}
 */
export const map = (object, reducer = (key, value, i) => value, preserve) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (typeof reducer !== 'function') {
    throw new ParameterError(1, 'function', reducer)
  }
  if (typeof preserve !== 'boolean' && preserve !== undefined) {
    throw new ParameterError(2, 'boolean', preserve)
  }

  if (preserve) {
    return Object.keys(object).reduce((data, key, i) => {
      data[key] = reducer(key, data[key], i)

      return data
    }, object)
  }

  return Object.entries(object).map(([key, value], i) => reducer(key, value, i))
}

/**
 *
 * @param {Object} object
 * @param {Function} reducer contains logic used to generate final value
 * @param {Any} initial initial value
 */
export const reduce = (object, reducer, initial) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (typeof reducer !== 'function') {
    throw new ParameterError(1, 'function', reducer)
  }

  return Object.entries(object).reduce(
    (total, [key, value], i) => reducer(total, key, value, i),
    initial
  )
}

/**
 *
 * @param {Object} object
 * @param {Object} options
 * @param {Function} options.reducer
 * @param {Number} options.initial
 */
export const sum = (object, { reducer, initial = 0 } = {}) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (typeof reducer !== 'function' && reducer !== undefined) {
    throw new ParameterError('reducer', 'function', reducer)
  }
  if (typeof initial !== 'number') {
    throw new ParameterError('initial', 'number', initial)
  }

  return reduce(
    object,
    (total, key, value) => total + +(reducer ? reducer(value) : value),
    initial
  )
}

/**
 * @param {Object} object
 * @param {Function} reducer
 * @return {void}
 */
export const forEach = (object, reducer = noop) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (typeof reducer !== 'function') {
    throw new ParameterError(1, 'function', reducer)
  }

  return Object.entries(object).forEach(([key, value], i) =>
    reducer(key, value, i)
  )
}

/**
 *
 * @param {Object} object
 * @param {Function|String[]|Number[]} include logic that determines if an item should be included
 *                                 or a list of specific keys to include
 * @return {Object} object including only passing items
 */
export const filter = (object, include) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (
    typeof include !== 'function' &&
    !Types.array.of(Types.oneOfType([Types.string, Types.number]))(include)
  ) {
    throw new ParameterError(1, 'function|string[]', include)
  }

  if (Array.isArray(include)) {
    return include.reduce((toInclude, key) => {
      toInclude[key] = object[key]

      return toInclude
    }, {})
  }

  return Object.keys(object).reduce((filteredObject, key, i) => {
    const value = object[key]

    if (!include(key, value, i)) {
      const { [key]: value, ...newObject } = filteredObject

      return newObject
    }

    return filteredObject
  }, object)
}

/**
 *
 * @param {Object|Number[]} object
 * @param {Function|String|String[]} removeIds
 */
export const remove = (object, removeIds) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (
    !['function', 'string'].includes(typeof removeIds) &&
    !Types.array.of(Types.oneOfType([Types.string, Types.number]))(removeIds)
  ) {
    throw new ParameterError(1, 'function|string|string[]', removeIds)
  }

  switch (typeof removeIds) {
    case 'function':
      return filter(object, (key, value, i) => !removeIds(key, value, i))
    case 'string':
      const { [removeIds]: removeValue, ...newObject } = object

      return newObject
    default:
      return removeIds.reduce((toRemoveFrom, removeId) => {
        const { [removeId]: removeValue, ...newObject } = toRemoveFrom

        return newObject
      }, object)
  }
}

/**
 *
 * @param {Object} object
 * @param {Function} reducer logic used to check if item passes condition
 * @return {Boolean} whether an object contains at least one passing item
 */
export const some = (object, reducer = noop) => {
  if (typeof object !== 'object') {
    throw new ParameterError(0, 'object', object)
  }
  if (typeof reducer !== 'function') {
    throw new ParameterError(1, 'function', reducer)
  }

  const objectKeys = Object.keys(object)

  for (let i = 0; i < objectKeys.length; i++) {
    const key = objectKeys[i]
    const value = object[key]

    if (reducer(key, value, i)) {
      return true
    }
  }

  return false
}

/**
 *
 * @param {Object} obj
 */
export const clean = (obj) => {
  if (typeof obj !== 'object') {
    throw new ParameterError(0, 'object', obj)
  }

  const propNames = Object.getOwnPropertyNames(obj)

  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i]

    if (obj[propName] === undefined) {
      delete obj[propName]
    }
  }

  return obj
}

/**
 *
 * @param {Object} obj
 * @param {*} value
 */
export const includesValue = (obj, value) => {
  if (typeof obj !== 'object') {
    throw new ParameterError(0, 'object', obj)
  }

  return Object.values(obj).includes(value)
}

/**
 *
 * @param {Object} obj
 * @param {String|Number} key
 */
export const includesKey = (obj, key) => {
  if (typeof obj !== 'object') {
    throw new ParameterError(0, 'object', obj)
  }
  if (!['string', 'number'].includes(typeof key)) {
    throw new ParameterError(1, 'string|number', key)
  }

  return Object.keys(obj).includes(`${key}`)
}
