const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')

module.exports = class UpdateAccessTokenRepository {
    constructor(userModel) {
        this.userModel = userModel
    }

    async update(userID, accessToken) {
        if (!userID) {
            throw new MissingParamError('userId')
        }
        if (!accessToken) {
            throw new MissingParamError('accessToken')
        }
        await this.userModel.updateOne({
            _id: userID
        }, {
            $set: {
                accessToken
            }
        })
    }
}