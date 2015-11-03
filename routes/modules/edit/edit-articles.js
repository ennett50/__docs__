var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var editSubCategories = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;
    mongoose.model('categories').find({}, function(err, categories){
        if (err) {
            return console.error(err);
        } else {
            mongoose.model('subcategories').find({}, function (err, subcategories) {
                if (err) {
                    return console.error(err);
                } else {
                    mongoose.model('articles').findById(req.id, function (err, articles) {
                        if (err) {
                            console.log('GET Error: There was a problem retrieving: ' + err);
                        } else {

                            //console.log(subcategories)
                            //var date = categories.created.toISOString();
                            // var dateFormat = date.substring(0, date.indexOf('T'));
                            res.format({
                                html: function () {
                                    res.render('edit/edit-articles', {
                                        "title": articles.title,
                                        "link": articles.link,
                                        "preview": articles.preview,
                                        "category_id": articles.category_id,
                                        "subcategory_id": articles.subcategory_id,

                                        //for from add subcategories
                                        "categories" : categories,
                                        "subcategories" : subcategories
                                    });
                                },
                                json: function () {
                                    res.json(subcategories);
                                }
                            });


                        }
                    });
                }
            });

        }
    });


};


module.exports = editSubCategories;