//default modules
var express = require('express'),
    router = express.Router(),
    //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
    methodOverride = require('method-override'),
    mongoose = require('../libs/mongoose'),
    Article = require('../libs/schema'),
    url = require("url");

//special modules
var editDataSites = require('./modules/edit/index.js');

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

//edit all data on site
router.get('/edit/', function(req, res){
    res.render('edit', { title: 'Редактирование данных'});
});


module.exports = router;
