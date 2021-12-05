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
      res.json(newPost)
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
