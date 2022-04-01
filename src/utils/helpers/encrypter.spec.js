class Encrypter {
  compare (password, hashedPassword) {
    this.password = password
    this.hashedPassword = hashedPassword
    return true
  }
}
describe('Ecrypter', () => {
  test('Should returns true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })
})
