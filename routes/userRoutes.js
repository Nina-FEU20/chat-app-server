const express = require('express')
const { createUser, loginUser, getAllUsers, getSingleUser } = require('../controllers/userControllers')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()

router.get('/', requireAuth, getAllUsers)
router.get('/:id', requireAuth, getSingleUser)
router.post('/', createUser)
router.post('/login', loginUser)

module.exports = router;