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
})