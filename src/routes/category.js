const express = require('express');
const router = express.Router();

const categoryController = require('../app/controllers/CategoryController');


router.get('/create', categoryController.create);
router.post('/store', categoryController.store);
router.delete('/:id', categoryController.delete);
router.get('/:id/edit', categoryController.edit);
router.put('/:id', categoryController.update);
router.delete('/:id/force', categoryController.forceDelete);
router.get('/:id/edit', categoryController.edit);
router.get('/:slug/stored', categoryController.list);

router.get('/ao-thun', categoryController.showaothun);
router.get('/quan', categoryController.showquan);
router.get('/ao-khoac', categoryController.showaokhoac);
router.get('/giay', categoryController.showgiay);
router.get('/non', categoryController.shownon);



module.exports = router;
