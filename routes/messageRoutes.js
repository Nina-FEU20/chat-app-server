const express = require('express');
const { sendMessage } = require('../controllers/messageControllers')
const { requireAuth } = require('../middleware/auth');


const router = express.Router();

// once testing is done, add requireAuth
router.route('/').post(sendMessage);

module.exports = router;
