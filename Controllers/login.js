const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const generateRefreshToken = require('../config/refreshToken')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const Admin = require('../model/admin')
// Route to register a new admin and generate JWT token


const AdminSchema = Joi.object({
    adminUserName: Joi.string().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,20}$/).required()
})

const register = async (req, res) => {
    try {
        const { adminUserName, password } = req.body;
        const resault = await AdminSchema.validateAsync(req.body)
        if (!(adminUserName && password)) {
            return res.status(400).send("All input is required");
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password less than 6 characters" })
        }
        const oldAdmin = await Admin.findOne({ where: { adminUserName } });

        if (oldAdmin) {
            return res.status(409).send("Admin is already Exist. Please login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            adminUserName,
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { adminUserName },
            'khder16',
            {
                expiresIn: "30d",
            }
        );

        admin.token = token;

        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
    }


}

    const login = async (req, res) => {
        try {
            const { adminUserName, password } = req.body;
            if (!(adminUserName && password)) {
                res.status(400).send("Enter email and password");
            }
            let admin = await Admin.findOne({ where: { adminUserName } });
            if (!admin) { throw new Error("Not Authorised") }
            if (admin && (await bcrypt.compare(password, admin.password))) {
                console.log(`Admin Loged-in`)
                const refreshToken = await generateRefreshToken(adminUserName)
                const updateUser = await Admin.update({
                    refreshToken: refreshToken,
                }, { where: { adminUserName: admin.adminUserName } })
                // for 10 days
                res.cookie("refreshToken", refreshToken, { maxAge: 240 * 60 * 60 * 1000 })
                //            req.session.authorized = true
                const token = await jwt.sign(
                    { adminUserName },
                    'Khder11',
                    {
                        expiresIn: "10d",
                    }
                );
                admin.token = token;
            } else {
                throw new Error("Invalid Email Or Password")
            }
            res.status(200).json(admin);
        } catch (error) {
            console.log(error);
        }
    };


    
const handleRefreshToken = async (req, res) => {
    try {
        const cookie = req.cookies;
        console.log(cookie)
        if (!cookie.refreshToken) {
            throw new Error("No Refresh Token in Cookies")
        }
        const refreshToken = cookie.refreshToken


        const user = await Admin.findOne({ refreshToken })
        if (!user) {
            throw new Error("No Refresh token present in db or not matched")
        }
        jwt.verify(refreshToken, process.env.TOKEN_KEY, (err, decoded) => {
            if (err || user.id != decoded.id) {
                throw new Error("There is somthing wrong with refresh token")
            }
            const accessToken = generateRefreshToken(user._id)
            res.json({ accessToken })
            // console.log(decoded)
        })
        res.json({ user })
    } catch (err) {
        console.log(err)
    }
}


    module.exports = { register, login }