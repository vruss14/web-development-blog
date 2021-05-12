const router = require('express').Router();
const { Blogpost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogData.map((blogpost) => blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const authorData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        user_id: req.session.user_id
      }
    })

    const authoredposts = authorData.map((authoredPost) => authoredPost.get({ plain: true }));

    res.render('dashboard', {
      authoredposts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     res.render('dashboard', { 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // Redirects user in case they are already logged into the site

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', withAuth, async (req, res) => {
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

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        blogpost_id: req.params.id
      }
    })

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments);

    res.render('singlepost', {
      ...blogpost,
      comments,
      logged_in: req.session.logged_in
    });

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
});

router.get('/writepost', async (req, res) => {
  try {
    res.render('writepost', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editpost', async (req, res) => {
  try {
    res.render('editpost', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
