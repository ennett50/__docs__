var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//var ObjectIdSchema = Schema.ObjectId;
//var ObjectId = mongoose.Types.ObjectId;


//поля для статей
var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    previewText : {
        type:     String,
        unique:   true
    },
    description:   {
        type:     String,
        unique:   true
    },
    created: {
        type: Date,
        default: Date.now
    },
    numberSort: {
        type: Number,
        default: Date.now()
    }
});


//поля для отображения главных категорий
var categoriesSchema = new mongoose.Schema({
    activationId: {
        type: mongoose.Schema.ObjectId,
        default: mongoose.Types.ObjectId
    },
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
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', articleSchema);
module.exports = mongoose.model('categories', categoriesSchema);
