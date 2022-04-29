const httpStatus = require('http-status');

const catchAsync = require('../../utils/catchAsync');
const depositsService = require('../../services/deposits.service');

const depositMoney = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const userId = req.params.userId

  const result = await depositsService.depositMoney(userId, reqBody);

  if (result.error) {
    res.status(httpStatus.BAD_REQUEST).send(result);
  } else {
    res.status(httpStatus.OK).send(result);
  }
});

module.exports = {
  depositMoney
};
