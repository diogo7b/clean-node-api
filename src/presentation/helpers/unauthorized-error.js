module.exports = class UnauthorizedError extends Error {
  constructor (paramError) {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
