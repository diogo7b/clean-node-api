const LoadUserByEmailRpository = require('./load-user-email-repository')
const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
let db

const makeSut = () => {
  return new LoadUserByEmailRpository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.db// in video é utilizado um metodo que chama o isConnected. Essa função não é mais utilizada.
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  // com a nova função, mongodb desconecta automaticamente
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invlaid@email')
    expect(user).toBeNull()
  })

  test('Should return an user if an user if found', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid@email.com')
    expect(user._id).toEqual(fakeUser.insertedId)
  })

  test('Should throw if no email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
