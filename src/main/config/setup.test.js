const request = require('supertest')
const app = require('./app')

describe('App Setup', () => {
  test('test Should disable x-powered-by header', async () => {
    app.get('/test_spoweredby', (req, res) => {
      res.send('x-powered-by')
    })

    const res = await request(app).get('/test_spoweredby')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  test('Should enabled CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('cors')
    })

    const res = await request(app).get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
