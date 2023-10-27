const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const Conn = require('../DB/db');


const logout = (req, res) => {
    res.redirect('/')
}

module.exports = { logout } 