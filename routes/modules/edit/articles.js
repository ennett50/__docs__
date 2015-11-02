var mongoose = require('../../../libs/mongoose');
var articles = require('../../../libs/schema');

var articles = function(req, res, next){
    mongoose.model('categories').find({}, function(err, categories){
        if (err) {
            return console.error(err);
        } else {
            mongoose.model('articles').find({}, function(err, articles){
                if (err) {
                    return console.error(err);
                } else {
                    res.format({
                        //HTML response will render the index.jade file in the views/blobs folder. We are also setting "articles" to be an accessible variable in our jade view
                        html: function () {
                            res.render('edit/articles', {
                                title: 'Статьи',
                                "articles": articles,
                                //for from add articles
                                "categories" : categories
                            });
                        },
                        //JSON response will show all blobs in JSON format
                        json: function () {
                            res.json(articles);
                        }


                    });
                }
            });
        }

    });

};

module.exports = articles;