const sequelize = require('sequelize');
const { Profile, Contract, Job } = require('../model');

const retrieveHighestPaidProfession = (jobs) => {
  const jobsHash = {};
  jobs.forEach((job) => {
    jobsHash[job.Contract.Contractor.profession] = (jobsHash[job.Contract.Contractor.profession] || 0) + job.price;
  });

  const max = Object.keys(jobsHash).reduce((a, v) => Math.max(a, jobsHash[v]), -Infinity);
  const result = Object.keys(jobsHash).filter((v) => jobsHash[v] === max);

  return { [result[0]]: jobsHash[result[0]] };
};

const retrieveHighestPayingClient = (jobs, limit) => {
  const jobsHash = {};
  jobs.forEach((job) => {
    jobsHash[job.Contract.ClientId] = (jobsHash[job.Contract.ClientId] || 0) + job.price;
  });

  const sortedClients = [];

  let counter = 0;
  while (counter < limit) {
    counter++;
    const max = Object.keys(jobsHash).reduce((a, v) => Math.max(a, jobsHash[v]), -Infinity);
    const result = Object.keys(jobsHash).filter((v) => jobsHash[v] === max);
    sortedClients.push({ [result[0]]: jobsHash[result[0]] });
    delete jobsHash[result[0]];
  }

  return sortedClients;
};

const getBestProfession = async (startDate, endDate) => {
  const jobs = await Job.findAll({
    include: [
      {
        model: Contract,
        required: true,
        include: [
          {
            model: Profile,
            as: 'Contractor',
          },
        ],
      },
    ],
    where: {
      paid: {
        [require('sequelize').Op.eq]: true,
      },
      createdAt: {
        [sequelize.Op.between]: [Date.parse(startDate), Date.parse(endDate)],
      },
    },
  });

  const result = retrieveHighestPaidProfession(jobs);

  return {
    profession: result,
  };
};

const getTopClients = async (startDate, endDate, limit) => {
  const jobs = await Job.findAll({
    include: [
      {
        model: Contract,
        required: true,
        include: [
          {
            model: Profile,
            as: 'Client',
          },
        ],
      },
    ],
    where: {
      paid: {
        [require('sequelize').Op.eq]: true,
      },
      createdAt: {
        [sequelize.Op.between]: [Date.parse(startDate), Date.parse(endDate)],
      },
    },
  });

  const result = retrieveHighestPayingClient(jobs, limit);

  return result;
};

module.exports = {
  getBestProfession,
  getTopClients,
};
