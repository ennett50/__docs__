//default modules
var express = require('express'),
    router = express.Router(),
    //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
    methodOverride = require('method-override'),
    mongoose = require('../libs/mongoose'),
    Article = require('../libs/schema'),
    url = require("url");

//special modules
var editDataSites = require('./modules/edit/index.js'),
    categories = require('./modules/edit/categories.js'),
    subcategories = require('./modules/edit/subcategories.js'),
    articles = require('./modules/edit/articles.js'),
    addCategories = require('./modules/edit/categories-add.js'),
    addSubCategories =  require('./modules/edit/subcategories-add.js'),
    addArticles = require('./modules/edit/articles-add.js'),
    categories__Index = require('./modules/index/index.js'),
    categories__List = require('./modules/index/list-subcategories.js'),
    subCategories__List = require('./modules/index/detail-subcategories.js'),
    categories_edit = require('./modules/edit/edit-categories.js'),
    categories_put =  require('./modules/edit/put-categories.js'),
    categories_delete = require('./modules/edit/delete-categories.js');

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

router.param('id', function (req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('categories').findById(id, function (err, article) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function () {
                    next(err);
                },
                json: function () {
                    res.json({message: err.status + ' ' + err});
                }
            });
            //if it is found we continue on
        } else {
            req.id = id;
            // go to the next thing
            next();
        }
    });
});


router.param('id', function (req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('subcategories').findById(id, function (err, article) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function () {
                    next(err);
                },
                json: function () {
                    res.json({message: err.status + ' ' + err});
                }
            });
            //if it is found we continue on
        } else {
            req.id = id;
            // go to the next thing
            next();
        }
    });
});




//index page
router.get('/', categories__Index);
router.route('/categories/:id').get(categories__List);
router.route('/subcategories/:id').get(subCategories__List);


//edit all data on site
router.get('/edit/', function(req, res){
    res.render('edit/index', { title: 'Редактирование данных'});
});
router.get('/edit/categories/', categories);
router.route('/edit/category/:id').get(categories_edit);
router.route('/edit/category/:id').put(categories_put);
router.route('/edit/category/:id').delete(categories_delete);
router.post('/edit/categories/', addCategories);

router.get('/edit/subcategories/', subcategories);
router.post('/edit/subcategories/', addSubCategories);


router.get('/edit/articles/', articles);
router.post('/edit/articles/', addArticles);

module.exports = router;
