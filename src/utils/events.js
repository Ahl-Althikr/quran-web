import noop from 'lodash.noop'

/**
 * Combined keydown and keyup event listener
 *
 * @param {Function} func
 * @return {Function} function to unsubscribe from listener
 */
export const onKeyHold = (func, options = false) => {
  window.addEventListener('keydown', func, options)
  window.addEventListener('keyup', func, options)

  return () => {
    window.removeEventListener('keydown', func, options)
    window.removeEventListener('keyup', func, options)
  }
}

function defaultOnQuery(queryListener, onSuccess, onFailure) {
  if (queryListener.matches) {
    onSuccess()
  } else {
    onFailure()
  }
}

/**
 * Create MediaQuery event listener
 *
 * @param  {string}   options.query     Evaluated css query
 * @param  {Function} options.onSuccess Called when css query evaluates to true
 * @param  {Function} options.onFailure Called when css query evaluates to false
 * @param  {Function} options.onQuery   Called when css query changes
 * @return {Function}                   Unsubscribe from MediaQuery event listener
 */
export const onMediaQuery = ({
  query,
  onSuccess = noop,
  onFailure = noop,
  onQuery = defaultOnQuery,
}) => {
  /**
   * Create MediaQuery with query
   */
  const queryListener = window.matchMedia(query)

  /**
   * Create listener binded to params
   */
  const onQueryListener = onQuery.bind(
    null,
    queryListener,
    onSuccess,
    onFailure
  )

  /**
   * Execute initial event
   */
  onQueryListener()

  /**
   * Subscribe event listener
   */
  queryListener.addListener(onQueryListener)

  /**
   * Return unsubscribe binded to event listener
   */
  return () => queryListener.removeListener(onQueryListener)
}

/**
 * @param {Function} func
 * @return {Function} unsubscribe from event listener
 */
export const onKeyDown = (func, options = false) => {
  window.addEventListener('keydown', func, options)

  return () => window.removeEventListener('keydown', func, options)
}

/**
 * @param {Function} func
 * @return {Function} unsubscribe from event listener
 */
export const onScroll = (element = window, func) => {
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }

  const onScrollExec = (e) => func(element, e)

  element.addEventListener('scroll', onScrollExec)

  return () => element.removeEventListener('scroll', onScrollExec)
}
