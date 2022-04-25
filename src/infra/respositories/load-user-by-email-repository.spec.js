const { MongoClient } = require('mongodb')

class LoadUSerByEmailRpository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = this.userModel.findOne({ email })
    return user
  }
}

describe('LoadUserByEmail Repository', () => {
  let client, db

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
    const userModel = await db.collection('users')
    const sut = new LoadUSerByEmailRpository(userModel)
    const user = await sut.load('invlaid@email')
    expect(user).toBeNull()
  })

  test('Should return an user if an user if found', async () => {
    const userModel = await db.collection('users')
    const mockUserValid = { email: 'valid@email.com' }
    await userModel.insertOne(mockUserValid)
    const sut = new LoadUSerByEmailRpository(userModel)
    const user = await sut.load('valid@email.com')
    expect(user.email).toBe('valid@email.com')
  })
})
