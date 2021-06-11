const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/:id/add-cart', cartController.addToCart);
router.get('/:id/reduce', cartController.reduce);
router.get('/:id/add', cartController.add);
router.get('/:id/remove', cartController.remove);

router.get('/', cartController.view);


module.exports = router;
