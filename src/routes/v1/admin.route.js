const express = require('express');

const adminController = require('../../controllers/admin/admin.controller');

const { getAdmin } = require('../../middleware/getAdmin');

const router = express.Router();

// /admin
router.route('/best-profession').get(getAdmin(), adminController.getBestProfession);
router.route('/best-clients').get(getAdmin(), adminController.getTopClients);

module.exports = router;
