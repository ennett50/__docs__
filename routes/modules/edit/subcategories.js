var mongoose = require('../../../libs/mongoose');
var subcategories = require('../../../libs/schema');

var subcategories = function(req, res, next){
    mongoose.model('categories').find({}, function(err, categories){
        //console.log(categories)
        if (err) {
            return console.error(err);
        } else {
            mongoose.model('subcategories').find({}, function(err, subcategories){
                if (err) {
                    return console.error(err);
                } else {
                    res.format({
                        //HTML response will render the index.jade file in the views/blobs folder. We are also setting "articles" to be an accessible variable in our jade view
                        html: function () {
                            res.render('edit/subcategories', {
                                title: 'Подкатегории',
                                "subcategories": subcategories,
                                //for from add subcategories
                                "categories" : categories
                            });
                        },
                        //JSON response will show all blobs in JSON format
                        json: function () {
                            res.json(subcategories);
                        }

                    });
                }
            });
        }
    });

};

module.exports = subcategories;