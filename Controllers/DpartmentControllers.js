const Department = require('../model/departmen')
const asyncWrapper = require('../Utils/Async');
const Joi = require('joi')
const { StatusCodes } = require('http-status-codes');

//get all department and their info 

const depName = Joi.object({
    Name: Joi.string().alphanum().required()
})
const GetDeptByName = asyncWrapper(async (req, res) => {

    try {
        let { Name } = req.body
        const resault = await depName.validateAsync(req.body)
        if (!Name) {
            res.json({ msg: "Please provide the name of the department" })
        }
        const getDepartment = await Department.findOne({ where: { Name } })
        if (!getDepartment) {
            res.json({ msg: "There is no such Department" })
        }
        res.json(getDepartment)
    } catch (error) {
        throw new Error(error)
    }
})




const GetAllDept = asyncWrapper(async (req, res, next) => {

    const allDep = await Department.findAll({})

    res.json(allDep)
});


const addDepSchema = Joi.object({
    Name: Joi.string().alphanum().required(),
    NumOfEmp: Joi.number().required(),
    MGR_SSN: Joi.number().required()
})

//ADD a new Department
const AddDept = asyncWrapper(async (req, res, next) => {
    try {
        const { Name, NumOfEmp, MGR_SSN } = req.body
        const resault = await addDepSchema.validateAsync(req.body)
        if (!Name || !NumOfEmp || !MGR_SSN) {
            res.json({ msg: "Please provide all information" })
        }
        const addedDep = await Department.create({ ...req.body })
        res.json(addedDep)
    } catch (error) {
        throw new Error(error)
    }
})



const updateDepSchema = Joi.object({
    Number: Joi.number().required(),
    Name: Joi.string().alphanum(),
    NumOfEmp: Joi.number(),
    MGR_SSN: Joi.number()
})

const UpdateDept = asyncWrapper(async (req, res, next) => {
    try {
        const updatedDep = await Department.update({ ...req.body }, { where: { Number: req.body.Number } })
        const resault = await updateDepSchema.validateAsync(req.body)

        if (!req.body.Number) {
            res.json({ msg: "Please provide the number of Department" })
        }
        res.json(updatedDep)
    } catch (error) {
        throw new Error(error)
    }
})





const delDepSchema = Joi.object({
    Number: Joi.number().required(),
})

const DeleteDept = asyncWrapper(async (req, res, next) => {
    try {
        const deletedDep = await Department.destroy({ where: { Number: req.body.Number } })
        const resault = await delDepSchema.validateAsync(req.body)
        res.json(deletedDep)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {
    GetAllDept,
    AddDept,
    UpdateDept,
    DeleteDept,
    GetDeptByName
}