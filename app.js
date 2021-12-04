const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const PORT = 3000
const indexRouter = require('./src/routes/index.router')
const postsRouter = require('./src/routes/posts.router')

// app.use(express.json())

app.set('view engine', 'hbs')
app.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))
app.set('views', path.join(process.env.PWD, 'src', 'views'))
app.use(express.json())
app.use('/', indexRouter)
app.use('/posts', postsRouter)

app.listen(PORT, () => console.log('Шарманка завелась'))
