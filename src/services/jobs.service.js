const { Profile, Job } = require('../model')

const ApiError = require('../utils/ApiError')

const { getAllContracts, getContractByPk } = require('../services/contracts.service')

const { sequelize } = require('../model');

const getAllUnpaidJobs = async (profileId) => {
  const contracts = await getAllContracts(profileId)
  contractsIds = contracts.map(contract => contract.id)
  const jobs = await Job.findAll({
    where: {
      paid: {
        [require('sequelize').Op.not]: true
      },
      contractId: {
        [require('sequelize').Op.in]: contractsIds
      }
    }
  });
  return jobs;
};

const payJob = async (jobId, paymentData) => {
  const job = await Job.findOne({
    where: {
      id: jobId
    }
  })
  const contract = await getContractByPk(job.ContractId)
  const client = await Profile.findByPk(contract.ClientId)
  const contractor = await Profile.findByPk(contract.ContractorId)

  if (client.balance < paymentData.amount) {
    return { error: 'Insufficient funds for transfer' }
  }

  try {

    const t = await sequelize.transaction();

    client.decrement('balance', { by: paymentData.amount }, { transaction: t })
    contractor.increment('balance', { by: paymentData.amount }, { transaction: t })

    await t.commit();

  } catch (error) {

    await t.rollback();
  }

  return {
    client: client,
    contractor: contractor
  };
};

module.exports = {
  getAllUnpaidJobs,
  payJob
}