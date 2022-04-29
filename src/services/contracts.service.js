const { Contract } = require('../model')

const sequelize = require('sequelize');

const getAllActiveContracts = async (profileId) => {
  const contracts = await Contract.findAll({
    where: {
      status: {
        [sequelize.Op.not]: 'terminated'
      },
      [sequelize.Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId }
      ]
    }
  });
  return contracts;
};

const getProfileContract = async (contractId, profileId) => {
  const contracts = await Contract.findAll({
    where: {
      id: contractId,
      [sequelize.Op.or]: [
        { ContractorId: profileId },
        { ClientId: profileId }
      ]
    }
  });
  return contracts;
};

module.exports = {
  getAllActiveContracts,
  getProfileContract
}