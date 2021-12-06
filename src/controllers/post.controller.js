const { Post } = require('../db/models')

const renderPost = async (req, res) => {

  const { limit = 2, offset } = req.query
  const allPosts = await Post.findAll({ order: [['id', 'DESC']], limit, offset })
  res.render('posts', { allPosts })
}


const addNewPost = async (req, res) => {
  try {
    // console.log(req.body)
    const { title, picture, description } = req.body
    const newPost = await Post.create({ title, picture, description })
    res.json(newPost)
  } catch (error) {
    res.sendStatus(400)
  }
}

const getNewPosts = async (req, res) => {
  const { limit = 1, offset } = req.query
  const allPosts = await Post.findAll({ order: [['id', 'DESC']], limit, offset })
  res.json(allPosts)
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.body
    await Post.destroy({ where: { id } })
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}

module.exports = {
  renderPost,
  addNewPost,
  deletePost,
  getNewPosts,
}
