var mongoose = require('../../../libs/mongoose');
var Article = require('../../../libs/schema');

var mainCategory = function(req, res, next){
    mongoose.model('mainCategory').find({}, function(err, categories){
        if (err) {
            return console.error(err);
        } else {
            res.format({
                //HTML response will render the index.jade file in the views/blobs folder. We are also setting "articles" to be an accessible variable in our jade view
                html: function () {
                    res.render('categories', {
                        title: '__Docs__ for everything',
                        "categories": categories
                      //  "pathname" : pathname
                    });
                },
                //JSON response will show all blobs in JSON format
                json: function () {
                    res.json(categories);
                }


            });
        }
    });
};

module.exports = mainCategory;