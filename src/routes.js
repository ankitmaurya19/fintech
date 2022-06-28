const express = require('express');
const { logMiddleware, showLogDetails } = require('./log_middleware');
const { signup, login } = require('./user_controller');

const router = express.Router();

router.post('/signup' , signup , logMiddleware("signup"));
router.post('/login' , login , logMiddleware("login"));

router.get('/logs' , showLogDetails);

module.exports = router;