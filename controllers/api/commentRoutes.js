const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blogpost_id: req.body.postId
    });

    res.status(200).json(newComment);
    console.log(req);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/author/:id', withAuth, async (req, res) => {
  try {
    const specificCommentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        user_id: req.params.id
      }
    })
    res.status(200).json(specificCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;