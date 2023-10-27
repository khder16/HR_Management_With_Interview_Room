const express = require('express')
const { GetAllEmp, GetEmp, Search, DeleteEmp, UpdateEmp } = require('../Controllers/EmployeeList')
const router = express.Router();
router.route('/allemployee').get(GetAllEmp)
router.route('/search').get(Search)
router.route('/employee').get(GetEmp).post(DeleteEmp).patch(UpdateEmp);


module.exports = router;