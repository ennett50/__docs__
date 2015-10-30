var mongoose = require('mongoose');


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
var mainCategory = new mongoose.Schema({
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
    icon_class: {
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
module.exports = mongoose.model('mainCategory', mainCategory);
