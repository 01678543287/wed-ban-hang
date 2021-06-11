var express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/fashionController');

router.get('fashion/style-for-couple', fashionController.fashionStyleOfMe);
router.get('fashion/style-of-me', fashionController.fashionStyleForCouple);
router.get('fashion/wash-jean', fashionController.fashionWashJean);
router.get('/', fashionController.index);

module.exports = router;
