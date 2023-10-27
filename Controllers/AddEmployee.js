const asyncWrapper = require('../Utils/Async');
const Joi = require('joi')

const { StatusCodes } = require('http-status-codes');
const Employee = require('../model/employee');




const AddEmployee = asyncWrapper(async (req, res, next) => {

    try {
        const employee = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            MartialStatus: req.body.MartialStatus || 'Single',
            City: req.body.City || 'Homs',
            DNO: req.body.DNO,
            Email: req.body.Email,
            BDate: req.body.BDate,
            Gender: req.body.Gender
        };
        const resault = await addEmpSchema.validateAsync(employee)
        const addedEmp = await Employee.create(employee)
        res.json(addedEmp)
    } catch (error) {
        throw new Error(error)
    }
})
const addEmpSchema = Joi.object({
    Email: Joi.string().email().lowercase().required(),
    first_name: Joi.string().min(3).max(20).alphanum().required(),
    last_name: Joi.string().min(3).max(20).alphanum().required(),
    City: Joi.string().min(3).max(50).alphanum().required(),
    DNO: Joi.string().required(),
    BDate: Joi.string().required(),
    Gender: Joi.string().required().valid('Male', 'Female'),
    MartialStatus: Joi.string().valid('Single', 'Married').required()
})


module.exports = {

    AddEmployee
}