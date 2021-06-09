const Cart = require('../models/Cart');
const Order = require('../models/Order');

const {mutipleMongooseToObject} = require('../../util/mongoose');


class CheckoutController {
  //[GET] /checkout
  checkOut(req, res, next) {
    if(!req.session.cart) {
      return res.redirect('cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', {total: cart.totalPrice});
  }
    //[POST] /checkout/final
    checkOutFinal(req, res, next) {
      if(!req.session.cart) {
        return res.redirect('cart');
      }
      const cart = new Cart(req.session.cart);
      const create = {
        amount: cart.totalPrice*100,
        currency: "đ",
      }
      const order = new Order({
        nameKH: req.body.name,
        cart: cart,
        address: req.body.name,
        
      });
      req.session.cart = null;
      res.redirect('/');
    }
}

module.exports = new CheckoutController();
