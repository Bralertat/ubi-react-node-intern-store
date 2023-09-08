// а проверяется ли токен непонятно или просто расшифровывается ключом и если там мусор в payload ему все равно

require('dotenv').config()
const express = require('express');
const sequelize = require('./db')// экземпляр нашей БД
const models = require('./models/models')// импортируем все таблицы с БД
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())// включаем поддержку CORS middleware ко всем запросам
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))// чтоб сервер мог раздавать статику в ответ на GET запросы localhost:7000/0c80d66c-3e86-402d-92f4-14f4a0d5d8c7.jpg
app.use(fileUpload({}))// модуль для загрузки файлов на сервере из данных запроса
app.use('/api', router) // все наши роуты сработают только на '/api'

//обработка ошибок в последнюю очередь, последний middleware
//странный function(err,req,res,next) первый пареметр err 
//он по количеству аргументов понимает что это тип error-middleware 
app.use(errorHandler)


const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log('Server started on port ', PORT))
  } catch (e) {
    console.log(e)
  }
}

start()
