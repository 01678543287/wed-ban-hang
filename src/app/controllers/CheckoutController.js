const Cart = require('../models/Cart');
const Order = require('../models/Order');

const {mutipleMongooseToObject} = require('../../util/mongoose');
const { session } = require('passport');


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
    const cart = new Cart(req.session.cart);
    const order = new Order({
      nameKH: req.body.name,
      cart: cart,
      address: req.body.address,
      numberPhone: req.body.phone,
      email: req.body.email,
    });
    order
      .save()
      .then(() => res.redirect('/'), req.session.cart = null)
      .catch((error) => {});
  } 
}

module.exports = new CheckoutController();
