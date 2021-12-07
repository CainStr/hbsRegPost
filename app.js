const express = require('express')
const path = require('path')

const hbs = require('hbs')
const PORT = 3000
const indexRouter = require('./src/routes/index.router')
const postsRouter = require('./src/routes/posts.router')
const editRouter = require('./src/routes/edit.router')
// console.log(hbs)
const morgan = require('morgan')
// app.use(express.json())
const app = express()
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))

app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'src', 'views'))
app.use(express.static(path.join(process.env.PWD, 'public')))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // <- 'application/x-www-form-urlencoded'
app.use('/', indexRouter)
app.use('/posts', postsRouter)
app.use('/edit', editRouter)

app.listen(PORT, () => console.log('Шарманка завелась'))
