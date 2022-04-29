const catchAsync = require('../../utils/catchAsync');
const contractsService = require('../../services/contracts.service');

const getAllContracts = catchAsync(async (req, res) => {
  const data = await contractsService.getAllActiveContracts(req.profile.id);
  res.send(data);
});

const getProfileContract = catchAsync(async (req, res) => {
  const reqParams = req.params;
  const data = await contractsService.getProfileContract(reqParams.contractId, req.profile.id);
  res.send(data);
});

module.exports = {
  getAllContracts,
  getProfileContract,
};
