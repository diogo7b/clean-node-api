const LoginRouter = require('../../presentation/routes/login-router')
const AuthUseCase = require('../../domain/usecase/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../infra/respositories/load-user-email-repository')
const UpdateAccessTokenRepository = require('../../infra/respositories/update-access-token-respository')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

const loadUserByEmailRepository = new LoadUserByEmailRepository()
const updateAccessTokenRepository = new UpdateAccessTokenRepository()
const encrypter = new Encrypter()
const tokenGenerator = new TokenGenerator(env.tokenSecret)
const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator
})
const emailValidator = new EmailValidator()
const loginRouter = new LoginRouter({
  authUseCase,
  emailValidator
})

module.exports = loginRouter
