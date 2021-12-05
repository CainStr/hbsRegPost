const indexRouter = require('express').Router()

indexRouter.get('', (req, res) => res.render('index'))

module.exports = indexRouter
