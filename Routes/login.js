const express = require('express')
const router = express.Router()
const {  login, register } = require('../Controllers/login')
router.route('/').post(login)
router.route('/register').post(register)
module.exports = router;