const { MongoHelper } = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository{
    constructor(userModel){
        this.userModel = userModel
    }
    async update(userID, accessToken){
        await this.userModel.updateOne({
            _id: userID
        }, {
            $set:{
                accessToken
            }
        })
    }
}

describe('UpdateAccessToken Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
        db = await MongoHelper.db// in video é utilizado um metodo que chama o isConnected. Essa função não é mais utilizada.
    })

    beforeEach(async () => {
        await MongoHelper.db.collection('users').deleteMany()
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
        await sut.update(fakeUser.ops[0]._id, "valid_token")
        const updatedFakeUser = await userModel({ _id: fakeUser.ops[0]._id })
        expect(updatedFakeUser.accessToken).toBe('valid_token')
    })
})