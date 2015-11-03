var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var putSubCategories = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;


    // Get our REST or form values. These rely on the "name" attributes
    var title = req.body.titleSubCategory,
        preview = req.body.previewSubCategory,
        category_id = req.body.nameCategory,
        description = req.body.descriptionSubCategory;
    if (req.body.imgSubCategory) {
        var img = req.body.imgSubCategory;
    }


    //find the document by ID
    mongoose.model('subcategories').findById(req.id, function (err, subcategories) {
        //update it
        subcategories.update({
            title : title,
            description : description,
            preview: preview,
            category_id: category_id,
            created: new Date
            // numberSort : Date.now()

        }, function (err, articleID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            else {
                //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                res.format({
                    html: function(){
                        res.redirect("/edit/subcategories");
                    },
                    //JSON responds showing the updated values
                    json: function(){
                        res.json(subcategories);
                    }
                });
            }
        })
    });
};


module.exports = putSubCategories;