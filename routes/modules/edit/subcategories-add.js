var url = require("url");
var mongoose = require('../../../libs/mongoose');
var subcategories = require('../../../libs/schema');
var util = require("util");
var fs = require("fs");


var addSubCategories = function (req, res,  next) {

    var title = req.body.titleSubCategory,
        description = req.body.descriptionSubCategory,
        img = req.body.imgSubCategory,
        preview = req.body.previewSubCategory,
        category_id = req.body.nameCategory;


    mongoose.model('categories').find({'_id' : category_id}, function(err, name_categories){
        //console.log(name_categories);
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            mongoose.model('subcategories').create({
                title: title,
                description: description,
                img: img,
                preview: preview,
                category_name : name_categories,
                category_id: category_id

            }, function (err, subcategories) {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {

                    res.format({
                        html: function () {
                            res.redirect('/edit/subcategories');
                        },
                        json: function () {
                            res.json(subcategories);
                        }
                    });
                    //mongoose.disconnect();
                }
            });
        }
    });


};




module.exports = addSubCategories;