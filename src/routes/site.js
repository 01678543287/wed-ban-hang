var express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/shop-system', siteController.shopsystem);
router.get('/news', siteController.new);
// router.get('/cart', siteController.cart);
router.get('/', siteController.index);

module.exports = router;
