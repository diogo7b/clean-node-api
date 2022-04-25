class LoadUSerByEmailRpository {
  async load (email) {
    return null
  }
}

describe('LoadUserByEmail Repository', () => {
  test('Should return null if no user is found', async () => {
    const sut = new LoadUSerByEmailRpository()
    const user = await sut.load('invlaid@email')
    expect(user).toBeNull()
  })
})
