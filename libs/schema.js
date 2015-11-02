var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//var ObjectIdSchema = Schema.ObjectId;
//var ObjectId = mongoose.Types.ObjectId;


//поля для статей
var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link:   {
        type:     String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    numberSort: {
        type: Number,
        default: Date.now()
    },
    category_id: {
        type: String,
        required: true
    },
    category_name: {
        type: Object,
        required: true
    },
    subcategory_id: {
        type: String,
        required: true
    },
    subcategory_name: {
        type: Object,
        required: true
    },
});


//поля для отображения главных категорий
var categoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


//поля для отображения подкатегонрий
var subCategoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    category_name: {
        type: Object,
        required: true
    },
    category_id : {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('articles', articleSchema);
module.exports = mongoose.model('categories', categoriesSchema);
module.exports = mongoose.model('subcategories', subCategoriesSchema);