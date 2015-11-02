var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var editCategories = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;


    mongoose.model('categories').findById(req.id, function (err, categories) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {

            //var date = categories.created.toISOString();
           // var dateFormat = date.substring(0, date.indexOf('T'));
            res.format({
                html: function () {
                    res.render('edit/edit-categories', {
                        "title": categories.title,
                        "description": categories.description,
                        "img" : categories.img
                    });
                },
                json: function () {
                    res.json(subcategories);
                }
            });


        }
    });
};


module.exports = editCategories;