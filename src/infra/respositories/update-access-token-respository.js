const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')

module.exports = class UpdateAccessTokenRepository {
  async update (userID, accessToken) {
    const db = MongoHelper.db

    if (!userID) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    await db.collection('users').updateOne({
      _id: userID
    }, {
      $set: {
        accessToken
      }
    })
  }
}
