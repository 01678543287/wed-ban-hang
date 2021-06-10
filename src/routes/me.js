const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/statistics/revenue', meController.statisticsRevenue);
router.get('/stored/products', meController.storedProducts);
router.get('/trash/products', meController.trashProducts);
router.get('/', function(req, res, next){
    res.render('me');
})
module.exports = router;
