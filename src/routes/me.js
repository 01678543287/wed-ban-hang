const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/statistics/revenue', isAdmin, meController.statisticsRevenue);
router.get('/stored/products', isAdmin, meController.storedProducts);
router.get('/statistics/revenue/excel', isAdmin, meController.exportStatisticsRevenue);
router.get('/total/revenue/excel', isAdmin, meController.exportTotalRevenue);
router.get('/stored/categorys', isAdmin, meController.storedCategory);
router.get('/trash/products', isAdmin, meController.trashProducts);
router.get('/trash/categorys', isAdmin, meController.trashCategory);
router.get('/admin/create', isFounder, meController.createdAdminAccount);
router.post('/admin/create', isFounder, meController.storedAdminAccount);
router.get('/blacklist/user', isAdmin, meController.blacklistUser);
router.get('/stored/user', isAdmin, meController.storedUsers);
router.get('/warehouse', isAdmin, meController.warehouse);
router.get('/', isAdmin, meController.home);
module.exports = router;

function isAdmin(req, res, next){
    if(req.isAuthenticated() && (req.user.isAdmin || (req.user.username === 'admin'))){
        return next();
    }
    res.redirect('/');
}

function isFounder(req, res, next){
    if(req.isAuthenticated() && (req.user.username === 'admin')){
        return next();
    }
    res.redirect('/');
}