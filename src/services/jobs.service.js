const { Profile, Job, Contract } = require('../model');

const { getAllContracts, getContractByPk } = require('./contracts.service');

const { sequelize } = require('../model');

const getAllUnpaidJobs = async (profileId) => {
  const contracts = await getAllContracts(profileId);
  const contractsIds = contracts.map((contract) => contract.id);
  const jobs = await Job.findAll({
    where: {
      paid: {
        [require('sequelize').Op.not]: true,
      },
      ContractId: {
        [require('sequelize').Op.in]: contractsIds,
      },
    },
  });
  return jobs;
};

const getAllJobs = async (profileId) => {
  const contracts = await getAllContracts(profileId);
  const contractsIds = contracts.map((contract) => contract.id);
  const jobs = await Job.findAll({
    where: {
      paid: {
        [require('sequelize').Op.eq]: true,
      },
      ContractId: {
        [require('sequelize').Op.in]: contractsIds,
      },
    },
  });
  return jobs;
};

const payJob = async (jobId, profileId) => {
  const job = await Job.findByPk(jobId);

  const contract = await getContractByPk(job.ContractId);

  if (profileId !== contract.ClientId) {
    return { error: 'You can only pay your own jobs' };
  }

  const client = await Profile.findByPk(contract.ClientId);
  const contractor = await Profile.findByPk(contract.ContractorId);

  if (client.balance < job.price) {
    return { error: 'Insufficient funds for transfer' };
  }

  try {
    const t = await sequelize.transaction();

    client.decrement('balance', { by: job.price }, { transaction: t });
    contractor.increment('balance', { by: job.price }, { transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
  }

  return {
    job,
    contract,
    client,
    contractor,
  };
};

module.exports = {
  getAllUnpaidJobs,
  getAllJobs,
  payJob,
};
