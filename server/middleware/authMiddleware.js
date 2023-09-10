const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk забираем сам токен
    if (!token) {
      return res.status(401).json({ message: "Нет токена авторизации, залогиньтесь" })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // если верификация прошла значит это тот самый токен что сервер ранее выдал и данные в нем корректны
    // если не прошла выкинет ошибку
    //сохраняем в запрос объект с юзер id email role
    // эти данные нужно sanitize???
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: "Токен авторизации не валиден" })
  }
};
