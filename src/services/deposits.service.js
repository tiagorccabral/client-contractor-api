const { Profile } = require('../model');

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

  const t = await sequelize.transaction();

  try {
    client.increment('balance', { by: amount }, { transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
  }

  await client.reload();

  return {
    client,
  };
};

module.exports = {
  depositMoney,
};
