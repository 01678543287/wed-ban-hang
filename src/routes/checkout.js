const express = require('express');
const router = express.Router();

const checkoutController = require('../app/controllers/CheckoutController');


router.post('/final', checkoutController.checkOutFinal);

router.get('/', checkoutController.checkOut);

module.exports = router;
