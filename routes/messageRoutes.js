const express = require('express');
const { sendMessage, getAllMessages } = require('../controllers/messageControllers')
const { requireAuth } = require('../middleware/auth');


const router = express.Router();

// once testing is done, add requireAuth
router.post('/', requireAuth, sendMessage);
router.get('/:id', requireAuth, getAllMessages)

module.exports = router;
