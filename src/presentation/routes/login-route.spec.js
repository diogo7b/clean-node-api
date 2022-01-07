const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')

const makeSut = () => {
  return new LoginRouter()
}
describe('Login Router', () => {
  test('Should return 400 if no e-mail provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'email@email.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest', async () => {
    const sut = makeSut()

    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', async () => {
    const sut = makeSut()
    const httpRequest = { }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  // test('Should call AuthUseCase with correct params', async () => {
  //   const sut = new LoginRouter()
  //   const httpRequest = { }
  //   const httpResponse = await sut.route(httpRequest)
  //   expect(httpResponse.statusCode).toBe(500)
  // })
})
