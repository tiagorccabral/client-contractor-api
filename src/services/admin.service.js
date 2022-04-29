const { Profile, Contract, Job } = require('../model')

const sequelize = require('sequelize');

const retrieveHighestPaidProfession = (jobs) => {
  const jobsHash = {};
  jobs.forEach(job => {
    jobsHash[job.Contract.Contractor.profession] = (jobsHash[job.Contract.Contractor.profession] || 0) + job.price;
  })

  const max = Object.keys(jobsHash).reduce((a, v) => Math.max(a, jobsHash[v]), -Infinity);
  const result = Object.keys(jobsHash).filter(v => jobsHash[v] === max);

  return { [result[0]]: jobsHash[result[0]] };
}

const getBestProfession = async (startDate, endDate) => {
  const jobs = await Job.findAll({
    include: [{
      model: Contract,
      required: true,
      include: [{
        model: Profile,
        as: 'Contractor',
      }]
    }],
    where: {
      paid: {
        [require('sequelize').Op.eq]: true
      },
      createdAt: {
        [sequelize.Op.between]: [Date.parse(startDate), Date.parse(endDate)]
      }
    },
  });

  const result = retrieveHighestPaidProfession(jobs)

  return {
    profession: result
  };
};

module.exports = {
  getBestProfession
}