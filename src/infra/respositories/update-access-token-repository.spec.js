const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
const { ObjectID, ObjectId } = require('mongodb')
let db

class UpdateAccessTokenRepository {
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
const makeSut = () => {
    const userModel = db.collection("users")
    const sut = new UpdateAccessTokenRepository(userModel)
    return {
        sut,
        userModel
    }
}

describe('UpdateAccessToken Repository', () => {
    beforeAll(async () => {
        // await MongoHelper.disconnect()
        await MongoHelper.connect(process.env.MONGO_URL)
        db = await MongoHelper.db// in video é utilizado um metodo que chama o isConnected. Essa função não é mais utilizada.
    })

    beforeEach(async () => {
        await db.collection('users').deleteMany()
    })

    afterAll(async () => {
        // await MongoHelper.disconnect()

    })

    test('Should update the user with the given access token', async () => {
        const { sut, userModel } = makeSut()
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

    test('Should throw if no params are provided', async () => {
        const { sut, userModel } = makeSut()
        const fakeUser = await userModel.insertOne({
            email: 'valid@email.com',
            name: 'any_name',
            age: 50,
            state: 'any_state',
            password: 'hashed_password'
        })
        const userId = fakeUser.insertedId.toString()//.rejects.toThrow(new MissingParamError('accesToken'))
        console.log(fakeUser.insertedId.toString())
        expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
        expect(sut.update(userId)).rejects.toThrow(new MissingParamError('accessToken'))
    })
})