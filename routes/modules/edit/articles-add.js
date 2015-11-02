var url = require("url");
var mongoose = require('../../../libs/mongoose');
var articles = require('../../../libs/schema');
var util = require("util");
var fs = require("fs");


var articles = function (req, res, next) {

    var title = req.body.titleArticles,
        link = req.body.linkArticles,
        category_id = req.body.nameCategory,
        subcategory_id = req.body.nameSubCategory;


    mongoose.model('categories').find({'_id': category_id}, function (err, name_categories) {
        //console.log(name_categories);
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            mongoose.model('subcategories').find({'_id': subcategory_id}, function (err, name_subcategories) {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    mongoose.model('articles').create({
                        title: title,
                        link: link,
                        category_name: name_categories,
                        category_id: category_id,
                        subcategory_name: name_subcategories,
                        subcategory_id: subcategory_id

                    }, function (err, articles) {
                        if (err) {
                            console.log(err);
                            res.send(err)
                        } else {

                            res.format({
                                html: function () {
                                    res.redirect('/edit/articles');
                                },
                                json: function () {
                                    res.json(articles);
                                }
                            });
                            //mongoose.disconnect();
                        }
                    });
                }
            });


        }
    });


};


module.exports = articles;