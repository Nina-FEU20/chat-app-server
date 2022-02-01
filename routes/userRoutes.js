const express = require('express')
const { createUser, loginUser, getAllUsers, getSingleUser, logoutUser, searchUser } = require('../controllers/userControllers')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()


router.get('/', requireAuth, getAllUsers)
router.get('/:id', requireAuth, getSingleUser)
router.post('/', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/search/:search', requireAuth, searchUser)


module.exports = router;