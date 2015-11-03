var url = require("url");
var mongoose = require('../../../libs/mongoose');
var categories = require('../../../libs/schema');

var putArticles = function (req, res, next) {
    //var pathname = url.parse(req.url).pathname;


    // Get our REST or form values. These rely on the "name" attributes
    var title = req.body.titleArticles,
        link = req.body.linkArticles,
        category_id = req.body.nameCategory,
        subcategory_id = req.body.nameSubCategory;



    //find the document by ID
    mongoose.model('articles').findById(req.id, function (err, articles) {
        //update it
        articles.update({
            title : title,
            link: link,
            category_id: category_id,
            subcategory_id: subcategory_id,
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
                        res.redirect("/edit/articles");
                    },
                    //JSON responds showing the updated values
                    json: function(){
                        res.json(articles);
                    }
                });
            }
        })
    });
};


module.exports = putArticles;