const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRpository {
  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    const user = MongoHelper
      .db
      .collection('users')
      .findOne({ email },
        {
          projection: {
            password: 1
          }
        })
    return user
  }
}
