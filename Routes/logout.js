const express = require('express')
const router = express.Router()
const { logout } = require('../Controllers/logout')
router.route('/').get(logout)

module.exports = router;