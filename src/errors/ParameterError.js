export class ParameterError extends Error {
  constructor(index, type, data) {
    super(
      `ParameterError: Parameter <${index}> must be of type <${type}>. Received <${JSON.stringify(
        data
      )}> of type <${Array.isArray(data) ? 'array' : typeof data}>.`
    )

    this.data = data
    this.name = 'ParameterError'
  }
}
