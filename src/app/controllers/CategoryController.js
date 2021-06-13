const Category = require('../models/Category');
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
}
module.exports = new CategoryController();
