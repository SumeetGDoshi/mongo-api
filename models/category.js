const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const categoydetails = new Schema({
    category_id: {
        type: String,
    },
    provider_category_id: {
        type: String,
    },
    service_id: {
        type: String,
    },
    category_name: {
        type: String,
    },
    description: {
        type: String,
    },
    slug_name: {
        type: String,
    },
    meta_description: {
        type: String,
    },
    meta_keyword: {
        type: String,
    },
    meta_title: {
        type: String,
    },
    image_path: {
        type: String,
    },
    SVG_content: {
        type: String,
    },
    likeCount: {
        type: String,
    }
},
    {
        timestamps: true,
    })


categoydetails.plugin(uniqueValidator, {
    message: 'already exists.',
})

const categorySchema = mongoose.model('category_masters', categoydetails)
module.exports = categorySchema;