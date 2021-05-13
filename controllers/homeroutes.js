const router = require('express').Router();
const { Op } = require('sequelize');
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
    // First, find all of the blog posts that match the user who is logged in
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

    // Serialize the data 
    const authoredposts = authorData.map((authoredPost) => authoredPost.get({ plain: true }));
    const postArray = [];

    // This means that the user has not authored any posts, and therefore there are no comments to display
    if(!authoredposts.length) {
      res.render('dashboard', {
        logged_in: req.session.logged_in
      });
      return;
    }

    // To the postArray, add the IDs of the blog posts that belong to the user who is logged in

    for (let i = 0; i < authoredposts.length; i++) {
      postArray.push(authoredposts[i].id);
    }

    // Find all the comments for the blog posts the user has authored

    const yourComments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      where: {
        blogpost_id: {
          // This is a where clause with multiple conditions; i.e. WHERE X OR Y OR Z
          [Op.or]: postArray
        }
      }
    })

    // Limits to the top 5 most recent comments for each user's dashboard AKA the last 5 items in the array
    // If the array is less than 5 items, all comments will be rendered

    if (yourComments.length > 5) {
      // The top 5 most recent comments is the last five items in the array, ordered backwards (most recent to least recent)
      const recentComments = yourComments.slice(Math.max(yourComments.length - 5, 0)).reverse();

      res.render('dashboard', {
        authoredposts,
        recentComments,
        logged_in: req.session.logged_in
      });

    } else if (yourComments.length) {
      res.render('dashboard', {
        authoredposts,
        yourComments,
        logged_in: req.session.logged_in
      });
    } else {
      res.render('dashboard', {
        authoredposts,
        logged_in: req.session.logged_in
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

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
