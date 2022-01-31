const express = require('express');
const { sendMessage, getAllMessages } = require('../controllers/messageControllers')
const { requireAuth } = require('../middleware/auth');


const router = express.Router();

// once testing is done, add requireAuth
router.post('/', sendMessage);
router.get('/:id', getAllMessages)

module.exports = router;
