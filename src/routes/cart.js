const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/:id/add-cart', cartController.addToCart);

router.get('/', cartController.view);


module.exports = router;
