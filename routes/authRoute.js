const express = require('express');
const { register, login, logout, users, dashboard } = require('../controllers/authController');

const routes = express.Router();
const {veryfyToken} = require('../middleware/auth') 


routes.post('/register',register);
routes.post('/login',veryfyToken,login );
routes.get('/dashboard',veryfyToken,dashboard );
routes.get('/users',users );
routes.get('/logout',logout );

module.exports = routes


