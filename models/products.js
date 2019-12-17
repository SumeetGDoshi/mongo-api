const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const aliseekproducts = new Schema({
    categoryId: {
        type: String,
    },
    title: {
        type: String,
    },
    skuImage: {
        type: String,
    },
    productImages: {
        type: Array,
    },
    reviews: {
        type: Object,
    },
    trade: {
        type: Object,
    },
    prices: [{
        originalPrice: {
                currency: {
                    type: String,
                },
                value: {
                    type: String
                },
        },
        discountedPrice: {
            currency: {
                type: String,
            },
            value: {
                type: String
            },
    },        
    }],
    likeCount: {
        type: String,
    }
},
    {
        timestamps: true,
    })


aliseekproducts.plugin(uniqueValidator, {
    message: 'already exists.',
})

const registerSchema = mongoose.model('aliseekproducts', aliseekproducts)
module.exports = registerSchema;