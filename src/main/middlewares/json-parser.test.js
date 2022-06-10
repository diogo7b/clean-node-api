const request = require('supertest')
const app = require('../config/app')

describe('JSON parser middleware', () => {
  test('should parser body as JSON', async () => {
    app.post('/test_jason_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_jason_parser')
      .send({ name: 'Diogo' })
      .expect({ name: 'Diogo' })
  })
})
