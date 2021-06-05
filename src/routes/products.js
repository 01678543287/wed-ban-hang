var express = require('express');
const router = express.Router();

const ProductController = require('../app/controllers/ProductController');

router.get('/create', ProductController.create);
router.post('/store', ProductController.store);
router.get('/:id/edit', ProductController.edit);
router.put('/:id', ProductController.update);
router.get('/:slug', ProductController.show);



module.exports = router;
