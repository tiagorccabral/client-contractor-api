const catchAsync = require('../../utils/catchAsync');
const adminService = require('../../services/admin.service');

const getBestProfession = catchAsync(async (req, res) => {
  const { query } = req;

  const startDate = query.start;
  const endDate = query.end;

  const data = await adminService.getBestProfession(startDate, endDate);
  res.send(data);
});

const getTopClients = catchAsync(async (req, res) => {
  const { query } = req;

  const startDate = query.start;
  const endDate = query.end;
  const { limit } = query;

  const data = await adminService.getTopClients(startDate, endDate, limit);
  res.send(data);
});

module.exports = {
  getBestProfession,
  getTopClients,
};
