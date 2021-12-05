const postsRouter = require('express').Router()
const { Post } = require('../db/models')

postsRouter.route('')
  .get(async (req, res) => {
    const allPosts = await Post.findAll({ order: [['id', 'DESC']] })
    res.render('posts', { allPosts })
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      const { title, picture, description } = req.body
      const newPost = await Post.create({ title, picture, description })
      const generateHtmlForPost = (newPost) => {
        // Вставляем разметку из hbs  и меняем {{{}}}на шаблонные строки `${} и this на аргумент передаваемый`
        return `<div data-id = "${newPost.id}" class="card my-4" style="width: 18rem;">
            <img src="${newPost.picture}" class="card-img-top" alt="${newPost.title}">
            <div class="card-body">
              <h5 class="card-title">${newPost.title}</h5>
              <p class="card-text">${newPost.description}</p>
              <a data-action="delete" href="#" class="btn btn-danger">Delete</a>
            </div>
          </div>`
      }
      
      res.json(generateHtmlForPost(newPost))
    } catch (error) {
      res.sendStatus(400)
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.body
      await Post.destroy({ where: { id } })
      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500)
    }
  })
module.exports = postsRouter
