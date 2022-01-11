module.exports = class ServerError extends Error {
  constructor (paramError) {
    super('An internal error ocurred')
    this.name = 'ServerError'
  }
}
