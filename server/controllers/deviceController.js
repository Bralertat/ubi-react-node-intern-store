// контроллеры это функции для роутеров
const uuid = require('uuid')// генератор случайных имен-айдишников
const path = require('path')// встроенный модуль Node.js адаптирует путь под любую операционку
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      // передаем только название файла но не сам файл изображения
      const device = await Device.create({ name, price, brandId, typeId, img: fileName })

      //непонятно почему info это массив и почему в одном запросе будет несколько элементов массива с именами описаниями и тд
      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          //"await не ставим намеренно чтобы не блокировать весь поток" что?????  он имеет ввиду поток мидлваров
          // что там создается асинхронно я не понял https://youtu.be/H2GCkRF9eko?si=G6cvAsqpRdHsaDxf&t=3155
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        )
      }

      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))//если возникла ошибка мы передаем её дальше(next) и в конце её поймает мидлвар-обработчик ошибок
    }

  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query// query это параметры запроса после "?"
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit // отступ сколько пропустить
    let devices
    if (!brandId && !typeId) {
      //findAndCountAll возвращает на фронт count: всего сколько таких товаров соответствующих фильтрам
      devices = await Device.findAndCountAll({ limit, offset })
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
    }
    return res.json(devices)
  }

  async getOne(req, res) {
    const { id } = req.params
    const device = await Device.findOne(
      {
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }]
      },
    )
    return res.json(device)
  }
}

module.exports = new DeviceController()
