const express = require('express');

const balancesController = require('../../controllers/balances/balances.controller');

const router = express.Router();

// /balances
router.route('/deposit/:userId').post(balancesController.depositMoney);

module.exports = router;
