const request = require('supertest')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
let db

describe("Login Routes", () => {

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

    test('Should return 200 when valid credentials are provided', async () => {
        await db.collection('users').insertOne({
            email: 'valid@email.com',
            password: 'hashed_password'
        })

        await request(app)
            .post('/api/login')
            .send({
                email: 'valid@email.com',
                password: 'hashed_password'
            })
            .expect(200)
    })
})