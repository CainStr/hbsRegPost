const express = require('express')
const path = require('path')
const morgan = require('morgan')
const hbs = require('hbs')
const PORT = 3000
const rootRouter = require('./src/routes/root.router')
// app.use(express.json())
const app = express()

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))

app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'src', 'views'))
app.use(express.static(path.join(process.env.PWD, 'public')))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // <- 'application/x-www-form-urlencoded'
app.use('/', rootRouter)

app.listen(PORT, () => console.log('Шарманка завелась'))
