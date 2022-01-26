class EmailValidator{
  isValid(email){
    return true
  }
}

describe('Email Validator', () => {
  test('should returns true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)

  })
})
