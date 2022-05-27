const MongoHelper = require('../helpers/mongo-helper')

class UpdateAccessTokenRepository {
    constructor(userModel) {
        this.userModel = userModel
    }

    async verifyUserModel() {
        if (!this.userModel) {
            throw new Error
        }
    }

    async update(userID, accessToken) {
        await this.userModel.updateOne({
            _id: userID
        }, {
            $set: {
                accessToken
            }
        })
    }
}

describe('UpdateAccessToken Repository', () => {
    let db
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
        db = await MongoHelper.db// in video é utilizado um metodo que chama o isConnected. Essa função não é mais utilizada.
    })

    beforeEach(async () => {
        await db.collection('users').deleteMany()
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    test('Should update the user with the given access token', async () => {
        const userModel = db.collection('users')
        const sut = new UpdateAccessTokenRepository(userModel)
        const fakeUser = await userModel.insertOne({
            email: 'valid@email.com',
            name: 'any_name',
            age: 50,
            state: 'any_state',
            password: 'hashed_password'
        })
        await sut.update(fakeUser.insertedId, "valid_token")
        const updatedFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
        expect(updatedFakeUser.accessToken).toBe('valid_token')
    })

    test('Should throw if no userModel is provided', async () => {
        const sut = new UpdateAccessTokenRepository()
        const userModel = db.collection('users')
        const fakeUser = await userModel.insertOne({
            email: 'valid@email.com',
            name: 'any_name',
            age: 50,
            state: 'any_state',
            password: 'hashed_password'
        })
        const promise = sut.update(fakeUser.insertedId, "valid_token")
        expect(promise).rejects.toThrow()
    })
})