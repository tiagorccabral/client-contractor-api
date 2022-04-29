const express = require('express');

const contractsController = require('../../controllers/contracts/contracts.controller');

const { getProfile } = require('../../middleware/getProfile');

const router = express.Router();

// /contracts
router.route('/').get(getProfile(), contractsController.getAllContracts);
router.route('/:contractId').get(getProfile(), contractsController.getProfileContract);

module.exports = router;
