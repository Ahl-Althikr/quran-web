export class ApiError extends Error {
  constructor(data, ...args) {
    super(...args)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError'
    this.data = data
    this.date = new Date()
  }
}
