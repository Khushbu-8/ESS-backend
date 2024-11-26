const express = require('express');
const { register, login, logout, users, dashboard } = require('../controllers/authController');

const routes = express.Router();
const {veryfyToken} = require('../middleware/auth') 


routes.post('/register',register);
routes.post('/login',login );
routes.get('/dashboard',veryfyToken,dashboard );
routes.get('/users',users );
routes.post('/logout',logout );

module.exports = routes


