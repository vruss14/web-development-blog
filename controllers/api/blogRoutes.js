const router = require('express').Router();
const { Blogpost, User, Comment } = require('../../models');
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
    res.status(500).json(err);
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
    console.log(blogpost.id);

    // Added layer of protection to make sure users cannot edit or delete posts that are not their own

    if (blogpost.user_id === req.session.user_id) {
      res.render('editpost', {
        ...blogpost,
        logged_in: req.session.logged_in
      });
    } else {
      res.redirect(`/blogpost/${blogpost.id}`);
    }

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
});

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

router.delete('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogpost.destroy({
      where: {
        id: req.body.postId,
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
