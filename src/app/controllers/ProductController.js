const Product = require('../models/Product');
const Category = require('../models/Category');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class ProductController {
    // [GET] /products
    index(req, res, next) {
        Product.find({}).sort({createdAt:-1})
            .then(products => {
                res.render('products',{
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    // [GET] /proucts/create
    create(req, res, next) {
        Category.find({})
            .then((categorys) =>
                res.render('products/create', {
                categorys: mutipleMongooseToObject(categorys),
                }),
            )
        //res.render('products/create');
    }
    // [POST] /products/store
    store(req, res, next) {
        const product = new Product(req.body);
        product
            .save()
            .then(() => res.redirect('/products/create'))
            .catch((error) => {});
    }
    // [GET] /products/:slug
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug})
            .then((product) =>
                res.render('products/show', {
                    product: mongooseToObject(product),
                }),
            )
            .catch(next);
    }
    // [GET] /products/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then((product) =>
                res.render('products/edit', {
                    product: mongooseToObject(product),
                }),
            )
            .catch(next);
    }

    // [PUT] /products/:id
    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }
    //[DELETE] products/:id
    delete(req, res, next) {
        Product.delete({_id: req.params.id},)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }
    //[PATCH] products/:id/restore
    restore(req, res, next) {
        Product.restore({_id: req.params.id},)
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] products/:id/force
    forceDelete(req, res, next) {
        Product.deleteOne({_id: req.params.id},)
            .then(() => res.redirect('/me/trash/products'))
            .catch(next);
    }
}
module.exports = new ProductController();
