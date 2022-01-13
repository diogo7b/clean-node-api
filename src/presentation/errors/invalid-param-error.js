module.exports = class InvalidParamError extends Error {
  constructor (paramError) {
    super(`Invalid Param: ${paramError}`)
    this.name = 'InvalidParamError'
  }
}
