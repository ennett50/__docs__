var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var deleteCategories = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;

    mongoose.model('categories').findById(req.id, function (err, categories) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            categories.remove(function (err, category) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    res.format({
                        //HTML returns us back to the index page, or you can create a success page
                        html: function(){
                            res.redirect("/edit/categories");
                        },
                        //JSON returns the item with the message that is has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                item : category
                            });
                        }
                    });
                }
            });
        }
    });
};


module.exports = deleteCategories;