const httpStatus = require('http-status');

const catchAsync = require('../../utils/catchAsync');
const jobsService = require('../../services/jobs.service');

const getUnpaidJobs = catchAsync(async (req, res) => {
  const data = await jobsService.getAllUnpaidJobs(req.profile.id);
  res.send(data);
});

const payJob = catchAsync(async (req, res) => {
  const jobId = req.params.job_id
  const profileId = req.profile.id

  const result = await jobsService.payJob(jobId, profileId);

  if (result.error) {
    res.status(httpStatus.BAD_REQUEST).send(result);
  } else {
    res.status(httpStatus.OK).send(result);
  }
});

module.exports = {
  getUnpaidJobs,
  payJob
};
