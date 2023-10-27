const express =require('express')
const Router=express.Router()
const {AddApplication, Sereach,ApproveApplication,DenyApplication,getAllApplications}=require('../Controllers/Applications')
Router.route('/getallapplications').get(getAllApplications)
Router.route('/addapplication').post(AddApplication)
Router.route('/search').get(Sereach)
Router.route('/approve').patch(ApproveApplication)
Router.route('/deny').patch(DenyApplication)
module.exports=Router