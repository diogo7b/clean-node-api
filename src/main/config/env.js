module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://database1:suKJyKTUeivfDoKW@cluster0.2uudfic.mongodb.net/?retryWrites=true&w=majority',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  port: process.env.PORT || 5858
}
