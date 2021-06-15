const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');

const {mutipleMongooseToObject} = require('../../util/mongoose');
const { session } = require('passport');


class CheckoutController {
  //[GET] /checkout
  checkOut(req, res, next) {
    if(!req.session.cart) {
      return res.redirect('cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('checkout', {total: cart.totalPrice},);
    
  }
  //[POST] /checkout/final
  checkOutFinal(req, res, next) {
    const cart = new Cart(req.session.cart);
    var username="";
    if(!req.user)
    {
      username = "Khách vãng lai";
    }
    else
    {
      username = req.user.username;
    }
    const order = new Order({
      user: username,
      nameKH: req.body.nameKH,
      cart: cart,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
    });
    //console.log(order)
    order
      .save()
      .then(() => res.redirect('/'), req.session.cart = null)
      .catch((error) => {});
  } 
}

module.exports = new CheckoutController();
