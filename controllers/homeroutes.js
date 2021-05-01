const router = require('express').Router();
const withAuth = require('../utils/auth');

// Need to GET blog posts by ID

let homeScript = {script: '../js/home.js'};

router.get('/', async (req, res) => {
  try {
    res.render('homepage', homeScript);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard');
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

router.get('/viewpost', withAuth, async (req, res) => {
  try {
    res.render('singlepost');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/writepost', async (req, res) => {
  try {
    res.render('writepost');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editpost', async (req, res) => {
  try {
    res.render('editpost');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;