const express = require('express');
const { accessChat, createGroupChat, getChatById, getChatsForCurrentUser } = require('../controllers/chatControllers');
const { requireAuth } = require('../middleware/auth');


const router = express.Router();

// once testing is done, ALL these should have requireAuth
router.route('/').post(accessChat);
router.route('/group').post(createGroupChat)
router.route('/:id').get(getChatById);
router.route('/').get(getChatsForCurrentUser);

module.exports = router;