const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk забираем сам токен
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // если верификация прошла значит это тот самый токен что сервер ранее выдал и данные в нем корректны
    //сохраняем в запрос объект с юзер id email role
    // эти данные нужно sanitize???
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: "Не авторизован" })
  }
};
