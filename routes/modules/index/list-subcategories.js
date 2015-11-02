var url = require("url");
var mongoose = require('../../../libs/mongoose');
var subcategories = require('../../../libs/schema');

var subcategoriesList = function (req, res, next) {
    var pathname = url.parse(req.url).pathname;


    mongoose.model('categories').findById(req.id, function (err, categories) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            mongoose.model('subcategories').find({'category_id' : req.id}, function(err, subcategories){
                var date = categories.created.toISOString();
                var dateFormat = date.substring(0, date.indexOf('T'));
                res.format({
                    html: function () {
                        res.render('subcategories-list', {
                            "title": categories.title,
                            "date_created" : dateFormat,
                            "description": categories.description,
                            "subcategories" : subcategories
                        });
                    },
                    json: function () {
                        res.json(categories);
                    }
                });
            });
        }
    });
};


module.exports = subcategoriesList;