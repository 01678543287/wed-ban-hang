const Category = require('../models/Category');
const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');



class CategoryController {


    // [GET] /categorys/create
    create(req, res, next) {
        res.render('categorys/create');
    }
    // [POST] /categorys/store
    store(req, res, next) {
        const category = new Category(req.body);
        category
            .save()
            .then(() => res.redirect('/categorys/create'))
            .catch((error) => {});
    }
    // [GET] /categorys/:id/edit
    edit(req, res, next) {
        Category.findById(req.params.id)
            .then((category) =>
                res.render('categorys/edit', {
                    category: mongooseToObject(category),
                }),
            )
            .catch(next);
    }

    // [PUT] /categorys/:id
    update(req, res, next) {
        Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/categorys'))
            .catch(next);
    }
    //[DELETE] categorys/:id
    delete(req, res, next) {
        Category.delete({_id: req.params.id},)
            .then(() => res.redirect('/me/stored/categorys'))
            .catch(next);
    }
    //[PATCH] categorys/:id/restore
    restore(req, res, next) {
        Category.restore({_id: req.params.id},)
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] categorys/:id/force
    forceDelete(req, res, next) {
        Category.deleteOne({_id: req.params.id},)
            .then(() => res.redirect('/me/trash/categorys'))
            .catch(next);
    }
    // [GET] /categorys/:slug
    // show(req, res, next) {
    //     Product.find({ cateID: '60c6044f64924c3484dca261'})
    //         .then((products) =>
    //             res.render('categorys/show', {
    //                 products: mutipleMongooseToObject(products),
    //             }),
    //         )
    //         .catch(next);
    // }
    show(req, res, next) {
        var products = [];
        Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'cateID',
                    foreignField: '_id',
                    as: 'category'
                }
            }
            ], 
            )
            .then((product) =>
                //console.log(product),
                {
                    for(var id in product[id])
                    {
                        products.push(product[id]);
                        return products;
                    }
                },
                console.log(products),
                res.render('categorys/show', {
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next);
            
            
            // function(err,products) {
            //     console.log(products);
            //     // if(products.cateID == '60c6044f64924c3484dca261')
            //     // {
            //         res.render('categorys/show', {
            //             products: mutipleMongooseToObject(products),
            //         });
            //     // }
            // }
            
        
    }
}
module.exports = new CategoryController();
