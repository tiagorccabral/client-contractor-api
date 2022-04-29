const sequelize = require('sequelize');
const { Contract } = require('../model');

const getAllActiveContracts = async (profileId) => {
  const contracts = await Contract.findAll({
    where: {
      status: {
        [sequelize.Op.not]: 'terminated',
      },
      [sequelize.Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });
  return contracts;
};

const getAllContracts = async (profileId) => {
  const contracts = await Contract.findAll({
    where: {
      [sequelize.Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });
  return contracts;
};

const getProfileContract = async (contractId, profileId) => {
  const contracts = await Contract.findOne({
    where: {
      id: contractId,
      [sequelize.Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
    },
  });
  return contracts;
};

const getContractByPk = async (contractId) => {
  const contracts = await Contract.findOne({
    where: {
      id: contractId,
    },
  });
  return contracts;
};

module.exports = {
  getAllActiveContracts,
  getAllContracts,
  getProfileContract,
  getContractByPk,
};
