var express = require('express');
const router = express.Router();
const fashionController = require('../app/controllers/fashionController')


router.get('/style-for-couple', fashionController.fashionStyleForCouple);
router.get('/style-of-me', fashionController.fashionStyleOfMe);
router.get('/wash-jean', fashionController.fashionWashJean);
// router.get('/', fashionController.index);

module.exports = router;
