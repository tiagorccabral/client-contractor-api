const express = require('express');

const contractsRoute = require('./contracts.route');
const jobsRoute = require('./jobs.route');

const router = express.Router();

router.use('/contracts', contractsRoute);
router.use('/jobs', jobsRoute);

module.exports = router;