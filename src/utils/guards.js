export function isFunction(x) {
  return typeof x === 'function'
}

export function isObject(x) {
  if (typeof x !== 'object' || x === null) return false

  let proto = x

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(x) === proto
}

export function isNumber(x) {
  return typeof x === 'number'
}

export function isString(x) {
  return typeof x === 'string'
}

export function isArray(x) {
  return Array.isArray(x)
}
