var url = require("url");
var mongoose = require('../../../libs/mongoose');
var articles = require('../../../libs/schema');

var deleteArticles = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;

    mongoose.model('articles').findById(req.id, function (err, articles) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            articles.remove(function (err, articles) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    res.format({
                        //HTML returns us back to the index page, or you can create a success page
                        html: function(){
                            res.redirect("/edit/articles");
                        },
                        //JSON returns the item with the message that is has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                item : articles
                            });
                        }
                    });
                }
            });
        }
    });
};


module.exports = deleteArticles;