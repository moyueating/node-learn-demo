const express = require('express');
const router = express.Router();
const pics = require('../controllers/pics')


router.get('/', pics.index)
router.post('/add', pics.add)

module.exports = router