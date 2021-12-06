const postsRouter = require('express').Router()
const postController = require('../controllers/post.controller')


postsRouter.route('')
  .get(postController.renderPost)
  .post(postController.addNewPost)
  .delete(postController.deletePost)

postsRouter.get('/get', postController.getNewPosts)


module.exports = postsRouter
