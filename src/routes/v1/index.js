const express = require('express');

const contractsRoute = require('./contracts.route');
const jobsRoute = require('./jobs.route');
const balancesRoute = require('./balances.route');
const adminsRoute = require('./admin.route');

const router = express.Router();

router.use('/admin', adminsRoute);
router.use('/contracts', contractsRoute);
router.use('/jobs', jobsRoute);
router.use('/balances', balancesRoute);

module.exports = router;
