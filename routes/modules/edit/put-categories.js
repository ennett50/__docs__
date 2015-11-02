var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var putCategories = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;


    // Get our REST or form values. These rely on the "name" attributes
    var title = req.body.titleCategory,
        description = req.body.descriptionCategory;
    if (req.body.imgCategory) {
        var img = req.body.imgCategory;
    }


    //find the document by ID
    mongoose.model('categories').findById(req.id, function (err, categories) {
        //update it
        categories.update({
            title : title,
            description : description,
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
                        res.redirect("/edit/categories");
                    },
                    //JSON responds showing the updated values
                    json: function(){
                        res.json(categories);
                    }
                });
            }
        })
    });
};


module.exports = putCategories;