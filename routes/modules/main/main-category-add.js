var url = require("url");
var mongoose = require('../../../libs/mongoose');
var Article = require('../../../libs/schema');

var getPostMainCategory = function (req, res,  next) {
    //console.log('--------------------------' + JSON.stringify(req.body));

    var title = req.body.titleCategory,
        description = req.body.descriptionCategory,
        icon_class = req.body.nameClassCategory;

    mongoose.model('mainCategory').create({
        title: title,
        description: description,
        icon_class: icon_class
    }, function (err, categories) {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            console.log(categories);
            // console.log('POST creating new article: ' + article);
            res.format({
                html: function () {
                    res.redirect('/');
                },
                json: function () {
                    res.json(categories);
                }
            });
            //mongoose.disconnect();
        }
    });
};




module.exports = getPostMainCategory;