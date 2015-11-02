var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');
var util = require("util");
var fs = require("fs");


var addCategories = function (req, res,  next) {
    console.log('____________________________');
    if (req.files) {
        console.log(util.inspect(req.files));
        if (req.files.myFile.size === 0) {
            return next(new Error("Hey, first would you select a file?"));
        }
        fs.exists(req.files.myFile.path, function(exists) {
            if(exists) {
                res.end("Got your file!");
            } else {
                res.end("Well, there is no magic for those who don’t believe in it!");
            }
        });
    }
    console.log(req.files);
    console.log('____________________________');

    var title = req.body.titleCategory,
        description = req.body.descriptionCategory,
        img = req.body.imgCategory;





    mongoose.model('categories').create({
        title: title,
        description: description,
        img: img
    }, function (err, categories) {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log(categories);
            // console.log('POST creating new article: ' + article);
            res.format({
                html: function () {
                    res.redirect('/edit/categories');
                },
                json: function () {
                    res.json(categories);
                }
            });
            //mongoose.disconnect();
        }
    });
};




module.exports = addCategories;