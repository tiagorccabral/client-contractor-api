const express = require('express');

const jobsController = require('../../controllers/jobs/jobs.controller');

const { getProfile } = require('../../middleware/getProfile');

const router = express.Router();

// /jobs
router.route('/unpaid').get(getProfile(), jobsController.getUnpaidJobs);
router.route('/:job_id/pay').post(getProfile(), jobsController.payJob);

module.exports = router;
