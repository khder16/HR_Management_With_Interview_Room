
const Employee = require('../model/employee')
const asyncWrapper = require('../Utils/Async');
const Joi = require('joi')




const GetAllEmp = asyncWrapper(async (req, res, next) => {
    const allEmp = await Employee.findAll({})
    res.json(allEmp)
})


const getEmpSchema = Joi.object({
    SSN: Joi.number().required()
})


const GetEmp = asyncWrapper(async (req, res, next) => {
    try {
        let { SSN } = req.body
        const resault = await getEmpSchema.validateAsync(req.body)
        if (!SSN) {
            res.json({ msg: "Please provide employee SSN" })
        }
        const oneEmployee = await Employee.findOne({
            where: { SSN }
        })
        if (!oneEmployee) {
            res.json({ msg: `There is no Employee with SSN: ${SSN}` })
        }
        res.json(oneEmployee)
    } catch (error) {
        throw new Error(error)
    }
})




const empSearchSchema = Joi.object({
    first_name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().required()
})

const Search = asyncWrapper(async (req, res, next) => {
    try {
        let { first_name, last_name } = req.body
        const resault = await empSearchSchema.validateAsync(req.body)
        if (!first_name || !last_name) {
            res.json({ msg: "Enter first name and last name of the employee you want" })
        }
        const empName = await Employee.findOne({ where: { first_name, last_name } })
        res.json(empName)
    } catch (error) {
        throw new Error(error)
    }
})




const delEmpSchema = Joi.object({
    SSN: Joi.number().required(),
})


const DeleteEmp = asyncWrapper(async (req, res) => {
    try {
        let { SSN } = req.body;
        const resault = await delEmpSchema.validateAsync(req.body)
        const deletedEmp = await Employee.destroy({ where: { SSN } })
        res.json({ msg: "Deleted successfuly" })
    } catch (error) {
        throw new Error(error)
    }
})





const updateEmepSchema = Joi.object({
    SSN: Joi.number().required(),
    Email: Joi.string().email().lowercase(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,20}$/),
    first_name: Joi.string().min(3).max(20).alphanum(),
    last_name: Joi.string().min(3).max(20).alphanum(),
    City: Joi.string().min(3).max(50).alphanum(),
    DNO: Joi.string(),
    BDate: Joi.string(),
    Gender: Joi.string().valid('Male', 'Female'),
    MartialStatus: Joi.string().valid('Single', 'Married')
})
const UpdateEmp = asyncWrapper(async (req, res) => {
    try {
        let { SSN } = req.body
        const updatedEmp = await Employee.update({ ...req.body }, { where: { SSN } })
        const resault = await updateEmepSchema.validateAsync(req.body)
        if (!req.body.SSN) {
            res.json({ msg: "Please provide the SSN of Employee" })
        }
        res.json(updatedEmp)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {
    GetAllEmp,
    GetEmp,
    Search,
    DeleteEmp,
    UpdateEmp
}