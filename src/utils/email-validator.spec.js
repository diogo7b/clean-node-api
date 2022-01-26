const validator = require('validator')

class EmailValidator {
  isValid(email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('should returns true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)

  })
  test('should returns false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)

  })
})
