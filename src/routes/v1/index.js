const express = require('express');

const contractsRoute = require('./contracts.route');

const router = express.Router();

router.use('/contracts', contractsRoute);

module.exports = router;