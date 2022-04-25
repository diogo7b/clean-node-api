const { MongoClient } = require('mongodb')
let client, db

class LoadUserByEmailRpository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = this.userModel.findOne({ email },
      {
        projection: {
          password: 1
        }
      })
    return user
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRpository(userModel)
  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await client.db()
  })

  afterAll(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invlaid@email')
    expect(user).toBeNull()
  })

  test('Should return an user if an user if found', async () => {
    const { userModel, sut } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid@email.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid@email.com')
    expect(user._id).toEqual(fakeUser.insertedId)
  })
})
