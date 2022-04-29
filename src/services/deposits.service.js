const { Profile, Job } = require('../model');

const { getAllContracts, getContractByPk } = require('./contracts.service');
const { getAllJobs } = require('./jobs.service');

const { sequelize } = require('../model');

const totalAmountToPay = async (client) => {
  const jobs = await getAllJobs(client.id);
  const total = 0;
  const sumWithInitial = jobs.reduce((previousValue, currentValue) => previousValue + currentValue.price, total);

  return sumWithInitial;
};

const depositMoney = async (clientId, depositData) => {
  const client = await Profile.findByPk(clientId);

  const { amount } = depositData;

  const totalAmount = await totalAmountToPay(client);

  if (totalAmount * 0.25 < amount) {
    return { error: 'Transfer amount can not be greater than 25% of all jobs to pay' };
  }

  try {
    const t = await sequelize.transaction();

    client.increment('balance', { by: amount }, { transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
  }

  return {
    client,
  };
};

module.exports = {
  depositMoney,
};
