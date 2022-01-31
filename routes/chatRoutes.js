const express = require('express');
const { getOrCreateOneOnOneChat, createGroupChat, getChatById, getChatsForCurrentUser } = require('../controllers/chatControllers');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, getOrCreateOneOnOneChat)
router.post('/group', requireAuth, createGroupChat)
router.get('/:id', requireAuth, getChatById)
router.route('/', requireAuth, getChatsForCurrentUser)

module.exports = router;