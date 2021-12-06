const indexRouter = require('express').Router()
const {indexRender} = require('../controllers/index.controller')

indexRouter.get('', indexRender)

module.exports = indexRouter
