const express = require('express')
const router = express.Router()
const { AddEmployee } = require('../Controllers/AddEmployee')
router.route('/').get(AddEmployee).post(AddEmployee)
module.exports = router;