
class fashionController {

    fashionStyleOfMe(req, res, next) {
       res.render('fashion/style-of-me');
    }
    fashionStyleForCouple(req, res, next) {
        res.render('fashion/style-for-couple');
     }
     fashionWashJean(req, res, next) {
        res.render('fashion/wash-jean');
     }
    

}
module.exports = new fashionController();
