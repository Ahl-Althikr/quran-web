import { ERROR_TYPE } from 'constants/types'
import isPlainObject from 'is-plain-object'

const Types = {}

Types.failed = (result) => {
  return result === ERROR_TYPE.FAILED_TYPE
}

Types.createType = (func) => {
  return (prop, resolver, store, parent, withValue = false) => {
    if (typeof resolver === 'function') {
      prop = resolver(prop, parent, store)
    } else if (prop === undefined) {
      prop = resolver
    }

    const passed = func(prop, resolver, store, parent, withValue)

    if (withValue) {
      return passed ? prop : ERROR_TYPE.FAILED_TYPE
    }

    return passed
  }
}

/**
| ------------------
| Primitives
| ------------------
*/

Types.boolean = Types.createType((prop) => {
  return typeof prop === 'boolean'
})

Types.boolean._name_ = 'boolean'

Types.null = Types.createType((prop) => {
  return prop === null
})

Types.null._name_ = 'null'

Types.undefined = Types.createType((prop) => {
  return prop === undefined
})

Types.undefined._name_ = 'undefined'

Types.string = Types.createType((prop) => {
  return typeof prop === 'string'
})

Types.string._name_ = 'string'

Types.number = Types.createType((prop) => {
  return typeof prop === 'number'
})

Types.number._name_ = 'number'

Types.map = Types.createType((prop) => {
  if (typeof prop !== 'object' || prop === null) return false

  let proto = prop

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(prop) === proto
})

Types.map._name_ = 'map'

Types.array = Types.createType((prop) => {
  return Array.isArray(prop)
})

Types.array._name_ = 'array'

/**
| ------------------
| Custom
| ------------------
*/

Types.oneOf = (elements) => {
  if (Types.object(elements)) {
    elements = Object.values(elements)
  }
  if (!Types.array(elements)) {
    throw Error('Types.oneOf take 1 argument, elements, which must be an array')
  }

  const oneOf = Types.createType((prop) => {
    return elements.includes(prop)
  })

  return oneOf
}

Types.oneOf._name_ = 'oneOf'

Types.oneOfType = (types, resolver) => {
  if (!Types.array(types)) {
    throw Error(
      'Types.oneOfType take 1 argument, types, which must be an array'
    )
  }

  function oneOfType(
    prop,
    resolvers = resolver,
    store,
    parent,
    withValue = false
  ) {
    const failedValue = withValue ? ERROR_TYPE.FAILED_TYPE : false

    for (let i = 0; i < types.length; i++) {
      const type = types[i]
      const passed = type(prop, resolvers, store, parent, withValue)

      if (passed !== failedValue) {
        return withValue ? passed : true
      }
    }

    return failedValue
  }

  oneOfType.data = types
  oneOfType._name_ = 'oneOfType'

  return oneOfType
}

Types.oneOfType._name_ = 'oneOfType'

/**
| ------------------
| Extensions
| ------------------
*/

Types.number.range = (min = -Infinity, max = Infinity) => {
  if (Types.object(min)) {
    return Types.number.range(min.min, min.max)
  }
  if (!(Types.number(min) && Types.number(max))) {
    throw Error(
      'Types.number.range take 2 argument, min and max, which are of Types number'
    )
  }

  const numberRange = Types.createType((prop) => {
    return Types.number(prop) && min <= prop && prop <= max
  })

  return numberRange
}

Types.number.range._name_ = 'number.range'

Types.array.of = (rule, resolver) => {
  if (typeof rule !== 'function') {
    throw Error(
      'Types.array.of take 1 argument, rule, which must be a function'
    )
  }

  function arrayOf(
    prop,
    resolvers = resolver,
    store,
    parent,
    withValue = false
  ) {
    const failedValue = withValue ? ERROR_TYPE.FAILED_TYPE : false

    if (!Types.array(prop)) return failedValue

    let nextProp = []

    for (let i = 0; i < prop.length; i++) {
      const p = prop[i]
      const passed = rule(p, resolvers, store, parent, withValue)

      if (passed === failedValue) {
        return failedValue
      } else if (withValue) {
        nextProp.push(passed)
      }
    }

    return withValue ? nextProp : true
  }

  arrayOf.data = rule
  arrayOf._name_ = 'arrayOf'

  return arrayOf
}

Types.array.of._name_ = 'array.of'

Types.map.shape = (rules, userResolvers = {}) => {
  if (typeof rules !== 'object') {
    throw Error('Types.shape take 1 argument, rules, which must be an object')
  }

  function mapShape(
    prop,
    resolvers = userResolvers,
    store,
    parent = prop,
    withValue = true
  ) {
    const failedValue = withValue ? ERROR_TYPE.FAILED_TYPE : false

    if (!isPlainObject(prop)) {
      return failedValue
    }

    const ruleKeys = Object.keys(rules)
    const nextProp = {}

    for (let i = 0; i < ruleKeys.length; i++) {
      const ruleKey = ruleKeys[i]
      const rule = rules[ruleKey]
      const resolver = resolvers[ruleKey]

      if (rule === undefined) {
        continue
      }

      // transfer value to preserve reference
      nextProp[ruleKey] = prop[ruleKey]

      const passed = rule(nextProp[ruleKey], resolver, store, parent, withValue)

      if (passed === failedValue) {
        return failedValue
      } else {
        nextProp[ruleKey] = passed
      }
    }

    return nextProp
  }

  mapShape.data = rules
  mapShape._name_ = 'mapShape'

  return mapShape
}

Types.map.shape._name_ = 'map.shape'

/**
| ------------------
| Alias
| ------------------
*/

Types.object = Types.map

export default Types
