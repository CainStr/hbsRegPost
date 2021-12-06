const rootRouter = require('express').Router()
const indexRouter = require('./index.router')
const postsRouter = require('./posts.router')

rootRouter.use('/', indexRouter)
rootRouter.use('/posts', postsRouter)

module.exports = rootRouter
