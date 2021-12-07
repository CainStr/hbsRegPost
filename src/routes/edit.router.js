const editRouter = require('express').Router()
const { Post } = require('../db/models')

editRouter.route('/:id')
  .get(async(req, res) => {
    console.log(req.body)
    const { id } = req.params
    const post = await Post.findByPk(Number(id))
// console.log(post)
    res.render('edit', {post})
  })
  .patch(async (req, res) => {
    const { id } = req.params
    console.log(req.body )
    await Post.update({ ...req.body }, {
      where: {
        id
      }
    })
    res.render('edit', { id })
  })

    // .get(async (req, res) => {
    //   try {
    //     const { id } = req.params
    //     const post = await Post.findByPk(Number(id))

    //     res.json(post)
    //   } catch (err) {
    //     console.log(err);
    //     res.sendStatus(500)
    //   }
    // })
    // .put(async (req, res) => {
    //   try {
    //     console.log('req=======>', req);
    //     const { id } = req.params
    //     await Post.update({ ...req.body }, {
    //       where: {
    //         id
    //       }
    //     })

    //     res.sendStatus(200)
    //   } catch (err) {
    //     res.sendStatus(500)
    //   }

    // })
    module.exports = editRouter


