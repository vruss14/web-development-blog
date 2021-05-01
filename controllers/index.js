const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('../controllers/api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;