const router = require('express').Router();
const { Blogpost, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
    console.log(newBlogpost)
  } catch (err) {
    res.status(400).json(err);
  }
});

// NEW ROUTE TO GET POST FOR EDITING

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const blogpost = blogData.get({ plain: true });

    res.render('editpost', {
      ...blogpost,
      logged_in: req.session.logged_in
    });

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
});

// NEW ROUTE TO EDIT

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const updatedBlogpost = await Blogpost.update({ 
      title: req.body.title,
      content: req.body.content
      }, 
      { where: 
        { id: req.body.postId } 
      });

    res.status(200).json(updatedBlogpost);
    console.log(updatedBlogpost)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
