const express = require('express');
const router = express.Router();
const { registerUser, confirmRegistration,
    loginUser,confirmLogin, loginByEmail, confirmLoginByEmail
 } = require('../controllers/authController');
 const admin = require('../firebase');
// const {confirmRegistration}=require('../controllers/authController')

// Registration route
router.post('/register', registerUser);
router.post('/register/confirm', confirmRegistration);

// Login route
router.post('/login', loginUser);
router.post('/login/confirm', confirmLogin);

// Email-based login and confirmation routes
router.post('/login-email', loginByEmail);
router.post('/login-email/confirm', confirmLoginByEmail);




module.exports = router;
