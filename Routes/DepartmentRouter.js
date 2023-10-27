//Router for department
const express=require('express');
const {GetAllDept, AddDept,UpdateDept,DeleteDept,GetDeptByName}=require('../Controllers/DpartmentControllers')
const Router=express.Router();
Router.route('/getalldepartment').get(GetAllDept);
Router.route('/add').post(AddDept);
Router.route('/search').get(GetDeptByName)
Router.route('/update').patch(UpdateDept).delete(DeleteDept);
module.exports=Router;
