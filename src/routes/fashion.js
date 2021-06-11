var express = require('express');
const router = express.Router();
const fashionController = require('../app/controllers/fashionController')


router.get('/style-for-couple', fashionController.fashionStyleOfMe);
router.get('/style-of-me', fashionController.fashionStyleForCouple);
router.get('/wash-jean', fashionController.fashionWashJean);
// router.get('/', fashionController.index);

module.exports = router;
