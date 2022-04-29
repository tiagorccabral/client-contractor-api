const express = require('express');

const balancesController = require('../../controllers/balances/balances.controller');

const { getProfile } = require('../../middleware/getProfile');

const router = express.Router();

// /balances
router.route('/deposit/:userId').post(balancesController.depositMoney);

module.exports = router;
