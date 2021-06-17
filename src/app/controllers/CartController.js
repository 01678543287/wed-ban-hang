const Cart = require('../models/Cart');
const Product = require('../models/Product');

const {mutipleMongooseToObject} = require('../../util/mongoose');


class CartController {
    //[GET] cart/:id/add-to-cart
    addToCart(req, res, next) {
      var productId = req.params.id;
      var size = req.query.size;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});


      Product.findById(productId, function(err, product) {
        if(err) {
          return res.redirect('back');
        }
        cart.add(product, product.id, size);
        req.session.cart = cart;
        res.redirect('back');
      }); 
    }
  //[GET] /cart
    view(req, res, next) { 
      if(!req.session.cart) {
          return res.render('cart' , {products: null});
       }
      var cart = new Cart(req.session.cart);
      res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, size: cart.size});
    };
    //[GET] /cart/:id/reduce
    reduce(req, res, next) { 
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});

      cart.reduceByOne(productId);
      req.session.cart = cart;
      res.redirect('/cart');
    };
    //[GET] /cart/:id/reduce
    add(req, res, next) { 
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});

      cart.addByOne(productId);
      req.session.cart = cart;
      res.redirect('/cart');
    };
    remove(req, res, next) { 
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});

      cart.removeAll(productId);
      req.session.cart = cart;
      res.redirect('/cart');
    };
}

module.exports = new CartController();
