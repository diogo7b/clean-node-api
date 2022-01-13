module.exports = class MissingParamError extends Error {
  constructor (paramError) {
    super(`Missing Param: ${paramError}`)
    this.name = 'MissingParamError'
  }
}
