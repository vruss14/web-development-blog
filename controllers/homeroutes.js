const router = require('express').Router();
const withAuth = require('../utils/auth');

// Need to GET and PUT blog posts by ID

let homeScript = {script: '../js/home.js'};

router.get('/', async (req, res) => {
  try {
    res.render('homepage', homeScript);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/viewpost', async (req, res) => {
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