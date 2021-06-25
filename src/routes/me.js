const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/statistics/revenue', meController.statisticsRevenue);
router.get('/stored/products', meController.storedProducts);
router.get('/statistics/revenue/excel', meController.exportStatisticsRevenue);
router.get('/total/revenue/excel', meController.exportTotalRevenue);
router.get('/stored/categorys', meController.storedCategory);
router.get('/trash/products', meController.trashProducts);
router.get('/trash/categorys', meController.trashCategory);
router.get('/blacklist/user', meController.blacklistUser);
router.get('/stored/user', meController.storedUsers);
router.get('/warehouse', meController.warehouse);
router.get('/', meController.home);
module.exports = router;
