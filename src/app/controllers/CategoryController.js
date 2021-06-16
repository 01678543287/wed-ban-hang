const Category = require('../models/Category');
const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');



class CategoryController {


    // [GET] /categorys/:slug
    list(req, res, next) {
        Promise.all([Product.find({cateID: req.params.slug}), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) => 
                res.render('categorys/list', {
                    deletedCount,
                    products: mutipleMongooseToObject(products)
                })
            )
            .catch(next);
    }
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

    // [GET] /categorys/hang-moi
    shownew(req, res, next) {
        const date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        Product.find({createdAt: {
            "$gte": new Date(year, month , day-30, ), 
            "$lt": new Date(year, month, day)
            }})
            .sort({createdAt:-1})
            .then((products) =>
                res.render('categorys/show', {
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next);
    }
    // [GET] /categorys/ao-thun
    showaothun(req, res, next) {
        // var products = [];
        // Product.aggregate([
        //     {
        //         $lookup: {
        //             from: 'categories',
        //             localField: 'cateID',
        //             foreignField: '_id',
        //             as: 'category'
        //         }
        //     }
        //     ],) 
        //     // .exec(function(err, products){
        //     //     console.log(products[2].category[0]._id);
        //     //     var categoryID = products[2].category[0]._id;
        //     //     if (err) throw err;
        //     //     res.render('categorys/show', {products: products},);
        //     // })
        //     .then((products) => {
        //         if(products.cateID === products.category)
        //             res.render('categorys/show', {products: products},);
        //     })
        //     .catch(next);





            // .then((products) =>
            //     //console.log(product),
            //     // {
            //     //     for(var id in product[id])
            //     //     {
            //     //         products.push(product[id]);
            //     //         return products;
            //     //     }
            //     // },
            //     // console.log(products),
            //     res.render('categorys/show', {
                    
            //         products: mutipleMongooseToObject(products),
            //     }),
            // )
            // .catch(next);
            
            
            // function(err,products) {
            //     console.log(products);
            //     // if(products.cateID == '60c6044f64924c3484dca261')
            //     // {
            //         res.render('categorys/show', {
            //             products: mutipleMongooseToObject(products),
            //         });
            //     // }
            // }
            



            Product.find({cateID: 'ao'}).sort({createdAt:-1})
                .then((products) =>
                    res.render('categorys/show', {
                        products: mutipleMongooseToObject(products),
                    }),
                )
                .catch(next);
        
    }
    // [GET] /categorys/quan
    showquan(req, res, next) {
        Product.find({cateID: 'quan'}).sort({createdAt:-1})
                .then((products) =>
                    res.render('categorys/show', {
                        products: mutipleMongooseToObject(products),
                    }),
                )
                .catch(next);
    }
    // [GET] /categorys/ao-khoac
    showaokhoac(req, res, next) {
        Product.find({cateID: 'ao-khoac'}).sort({createdAt:-1})
                .then((products) =>
                    res.render('categorys/show', {
                        products: mutipleMongooseToObject(products),
                    }),
                )
                .catch(next);
    }
    // [GET] /categorys/giay
    showgiay(req, res, next) {
        Product.find({cateID: 'giay'}).sort({createdAt:-1})
                .then((products) =>
                    res.render('categorys/show', {
                        products: mutipleMongooseToObject(products),
                    }),
                )
                .catch(next);
    }
    // [GET] /categorys/non
    shownon(req, res, next) {
        Product.find({cateID: 'non'}).sort({createdAt:-1})
                .then((products) =>
                    res.render('categorys/show', {
                        products: mutipleMongooseToObject(products),
                    }),
                )
                .catch(next);
    }
}
module.exports = new CategoryController();
