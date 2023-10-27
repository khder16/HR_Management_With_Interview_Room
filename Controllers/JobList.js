const Job = require('../model/job')
const Department = require('../model/departmen')
const Employee = require('../model/employee')
const asyncWrapper = require('../Utils/Async');
const Joi = require('joi')

const GetAllJob = asyncWrapper(async (req, res) => {
    try {
        const allJob = await Job.findAll({})
        if (allJob.length === 0) {
            res.json({ msg: "there is no jobs" })
        }
        res.json(allJob)
    } catch (error) {
        throw new Error(error)
    }
})


const jobDepSchema = Joi.object({
    DNO: Joi.number().required()
})

const jobByDep = asyncWrapper(async (req, res) => {
    try {
        const { DNO } = req.body
        const resault = await jobDepSchema.validateAsync(req.body)
        const jobs = await Job.findAll({ where: { DNO } })
        if (jobs.length === 0) {
            res.json({ msg: "There is no jobs in this department" })
        }
        res.json(jobs)
    } catch (error) {
        throw new Error(error)
    }
})


const addJobSchema = Joi.object({
    Title: Joi.string().min(3).max(50).required(),
    Job2: Joi.string().min(3).max(50).required(),
    Status: Joi.boolean().required(),
    first_name: Joi.string().min(3).max(50).required(),
    last_name: Joi.string().min(3).max(50).required()

})


const AddJob = asyncWrapper(async (req, res) => {
    try {
        const { Title, Job2, Status, first_name, last_name } = req.body
        const resault = await addJobSchema.validateAsync(req.body)
        const emp = await Employee.findOne({ where: { first_name, last_name } })
        if (!Title || !Job || !Status || !first_name || !last_name) {
            res.json({ msg: "Please provide all information" })
        }
        const addedJob = await Job.create({
            title: Title,
            statuse: Status,
            Job: Job2,
            DNO: emp.DNO,
            ESSN: emp.ESSN,
            StartDate: Date.now(),
        })
        res.json(addedJob)
    } catch (error) {
        throw new Error(error)
    }
})



const deleteJobSchema = Joi.object({
    id: Joi.number().required()
})


const DeleteJob = asyncWrapper(async (req, res) => {
    try {
        let id = req.params.id;
        const resault = await deleteJobSchema.validateAsync(req.body)
        const deletedJob = await Job.destroy({ where: { id } })
        if (deletedJob === 1) {
            res.json("Deleted Successfully")
        }

    } catch (error) {
        throw new Error(error)
    }
})



const updateJobSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    id: Joi.number().required(),
    Status: Joi.boolean(),
    EndDate: Joi.date()

})

const UpdateJob = asyncWrapper(async (req, res) => {
    try {
        const { title, statuse, id } = req.body
        const resault = await updateJobSchema.validateAsync(req.body)
        if (!title || !statuse || !id) {
            res.json({ msg: "Please provide all information" })
        }
        const updatedJob = await Job.update({
            EndDate: req.body.EndDate,
            statuse: statuse,
        }, { where: { id: req.body.id, title: req.body.title } })
        const aded = await Job.findOne({ where: { title } })
        res.json(aded)
    } catch (error) {
        throw new Error(error)
    }
})

const searchJobSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
})

const Search = asyncWrapper(async (req, res, next) => {
    let { title } = req.body
    const resault = await searchJobSchema.validateAsync(req.body)
    const searchedJob = await Job.findAll({ where: { title } })
    res.json(searchedJob)
})
module.exports = { AddJob, DeleteJob, Search, UpdateJob, GetAllJob, jobByDep }