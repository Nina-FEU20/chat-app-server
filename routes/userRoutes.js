const express = require('express')
const { createUser, loginUser, getAllUsers, getSingleUser } = require('../controllers/userControllers')

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
router.post('/', createUser)
router.post('/login', loginUser)

module.exports = router;