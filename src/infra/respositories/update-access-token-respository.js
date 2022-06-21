const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')

module.exports = class UpdateAccessTokenRepository {
  async update (userID, accessToken) {
    if (!userID) {
      throw new MissingParamError('userId')
    }
    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }
    await MongoHelper.db.collection('users').updateOne({
      _id: userID
    }, {
      $set: {
        accessToken
      }
    })
  }
}
