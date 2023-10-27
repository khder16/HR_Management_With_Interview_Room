const Conn = require('../DB/db');
const asyncWrapper = require('../Utils/Async');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi')

const { sequelize, Op } = require('sequelize');
const Employee = require('../model/employee');
const Requests = require('../model/requests');
const { request } = require('express');


const appSchema = Joi.object({
    first_name: Joi.string().min(3).max(20).required(),
    last_name: Joi.string().min(3).max(20).required(),
    Date: Joi.date().required(),
    Status: Joi.boolean().required(),
    ID: Joi.number().required()
})


const AddApplication = async (req, res, next) => {
    try {

        let { first_name, last_name, Title, Date, Status } = req.body
        const resault = await appSchema.validateAsync(req.body)
        const employee = await Employee.findOne({
            attributes: ['SSN'],
            where: { first_name: first_name, last_name: last_name }
        })
        console.log(employee.SSN)
        if (!employee) {
            res.json(" No employee found")
        }

        const insertObject = {
            ESSN: employee.SSN,
            Title: Title,
            Date: Date,
            Status: Status
        }
        const createdReq = await Requests.create(insertObject)
        res.json(createdReq)
    } catch (error) {
        throw new Error(error)
    }
}




const serSchema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(50).required()
})

const Sereach = asyncWrapper(async (req, res, next) => {
    let { first_name } = req.body
    const resault = await serSchema.validateAsync(req.body)
    const employee = await Employee.findOne({
        attributes: ['SSN'],
        where: { first_name: first_name }
    })
    
    const requsestSearchName = await Requests.findOne({
        where: { ESSN: employee.SSN }
    })
    res.json(requsestSearchName)
})

const approveSchema = Joi.object({
    ID: Joi.number().required()
})
const ApproveApplication = asyncWrapper(async (req, res, next) => {
    try {
        let { ID } = req.body
        const resault = await approveSchema.validateAsync(req.body)
        const updatedApp = await Requests.update({ Status: "true" }, { where: { ID } })
        const updaete = await Requests.findOne({ ID })
        res.json(updaete)
    } catch (error) {
        throw new Error(error)
    }
})


const denaySchema = Joi.object({
    ID: Joi.number().required()
})

const DenyApplication = asyncWrapper(async (req, res, next) => {
    let { ID } = req.body
    const resault = await denaySchema.validateAsync(req.body)

    const updatedApp = await Requests.update({ Status: "false" }, { where: { ID } })
    const updaete = await Requests.findOne({ ID })
    res.json(updaete)
})
const getAllApplications = asyncWrapper(async (req, res, next) => {
    try {
        const allApp = await Requests.findAll({
            attributes: ['id', 'title', 'status', 'createdAt']
        })
        res.json(allApp)
    } catch (error) {
        throw new Error(error)
    }
})




module.exports = { AddApplication, Sereach, ApproveApplication, DenyApplication, getAllApplications }