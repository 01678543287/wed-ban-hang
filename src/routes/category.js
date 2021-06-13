const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/CategoryController');


router.get('/create', categoryController.create);
router.post('/store', categoryController.store);
router.delete('/:id', categoryController.delete);
router.get('/:id/edit', categoryController.edit);
router.put('/:id', categoryController.update);
router.delete('/:id/force', categoryController.forceDelete);
router.patch('/:id/restore', categoryController.restore);



module.exports = router;
