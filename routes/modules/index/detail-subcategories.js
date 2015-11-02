var url = require("url");
var mongoose = require('../../../libs/mongoose');
var subcategories = require('../../../libs/schema');

var subcategoriesList = function (req, res, next) {
    var pathname = url.parse(req.url).pathname;


    mongoose.model('subcategories').findById(req.id, function (err, subcategories) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            mongoose.model('articles').find({'subcategory_id' : req.id}, function(err, articles){
                var date = subcategories.created.toISOString();
                var dateFormat = date.substring(0, date.indexOf('T'));
                res.format({
                    html: function () {
                        res.render('subcategories-detail', {
                            "title": subcategories.title,
                            "date_created" : dateFormat,
                            "description": subcategories.description,
                            //"subcategories" : subcategories,
                            "articles" : articles,
                            "category_id" : subcategories.category_id
                        });
                    },
                    json: function () {
                        res.json(subcategories);
                    }
                });

            });

        }
    });
};


module.exports = subcategoriesList;