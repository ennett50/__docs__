var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var deleteSubCategories = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;

    mongoose.model('subcategories').findById(req.id, function (err, subcategories) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            subcategories.remove(function (err, subcategory) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    res.format({
                        //HTML returns us back to the index page, or you can create a success page
                        html: function(){
                            res.redirect("/edit/subcategories");
                        },
                        //JSON returns the item with the message that is has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                item : subcategory
                            });
                        }
                    });
                }
            });
        }
    });
};


module.exports = deleteSubCategories;