const Cart = require('../models/Cart');
const Product = require('../models/Product');

const {mutipleMongooseToObject} = require('../../util/mongoose');


class CartController {
    //[GET] cart/:id/add-to-cart
    addToCart(req, res, next) {
      var productId = req.params.id;
      var size = req.query.size;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});
      var itemQty = req.params.qty;


      Product.findById(productId, function(err, product) {
        if(err) {
          return res.redirect('back');
        }
        
        // itemQty = product.qty - 1;
        // console.log(itemQty);
        cart.add(product, product.id, size);
        
        req.session.cart = cart;
        res.redirect('back');
      });
      Product.updateOne({_id: productId},{ $inc: { qty: -1,} })
            .then();
    }
  //[GET] /cart
    view(req, res, next) { 
      if(!req.session.cart) {
          return res.render('cart' , {products: null});
       }
      var cart = new Cart(req.session.cart);
      res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice,});
    };
    //[GET] /cart/:id/reduce
    reduce(req, res, next) { 
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});

      cart.reduceByOne(productId);
      Product.updateOne({_id: productId},{ $inc: { qty: 1,} })
            .then();
      req.session.cart = cart;
      res.redirect('back');
    };
    //[GET] /cart/:id/reduce
    add(req, res, next) { 
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});

      cart.addByOne(productId);
      Product.updateOne({_id: productId},{ $inc: { qty: -1,} })
            .then();
      req.session.cart = cart;
      res.redirect('back');
    };
    remove(req, res, next) { 
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart:{products: {}});

      cart.removeAll(productId);
      req.session.cart = cart;
      res.redirect('back');
    };
}

module.exports = new CartController();
