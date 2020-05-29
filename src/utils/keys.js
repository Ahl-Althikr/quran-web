/**
 * @param {String} type custom type alias
 * @return {String} default custom type
 */
export const typeToDefault = (type) => {
  switch (type) {
    case 'option':
      return 'alt'
    case 'return':
      return 'enter'
    case 'back':
      return 'delete'
    case 'cmd':
    case 'cntrl':
      return 'super'
    default:
      return type
  }
}

/**
 *
 * @param {String|Number} key built-in keyboard event type
 * @return {String} custom keyboard event type
 */
export const keyToType = (key) => {
  switch (key) {
    case 'Meta':
    case 'Control':
    case 91:
    case 17:
    case 93:
      return 'super'
    case 'Escape':
    case 'Esc':
    case 27:
      return 'esc'
    case 'Alt':
    case 18:
      return 'alt'
    case 'ArrowLeft':
    case 37:
      return 'left'
    case 'ArrowRight':
    case 39:
      return 'right'
    case 'ArrowUp':
    case 38:
      return 'up'
    case 'ArrowDown':
    case 40:
      return 'down'
    case 'Shift':
    case 16:
      return 'shift'
    case 'return':
    case 'Enter':
    case 13:
      return 'enter'
    case 'Backspace':
    case 8:
      return 'delete'
    case 'Tab':
    case 9:
      return 'tab'
    default:
      return key
  }
}

/**
 * @param {Event} e keyboard event
 * @param {String} type keyboard event type
 * @return {Boolean} whether keyboard event is of given type
 */
export const isKey = (e, type) => {
  const key = e.key || e.keyCode
  const keyType = keyToType(key)
  const defaultType = typeToDefault(type)

  return keyType === defaultType
}

/**
 * @param {Event} e keyboard event
 * @param {Object} keyMap event type to custom action mapping
 * @return {*} mapping value return or function call
 */
export const onKey = (e, keyMap) => {
  const key = e.key || e.keyCode
  const keyType = keyToType(key)

  if (typeof keyMap[keyType] === 'function') {
    return keyMap[keyType](key, keyType)
  } else if (typeof keyMap.fallback === 'function') {
    return keyMap.fallback(key, keyType)
  }

  return keyMap[keyType]
}
