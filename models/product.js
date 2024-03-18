const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type : String,
        required : [true,'Product name must be provided']
    },
    price: {
        type : Number,
        required : [true,'Product price must be provided']
    },
    featured: {
        type : Boolean,
        default: false
    },
    rating:{
        type : Number,
        default : 4.5
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    company : {
        type : String,
        // limit the values
        enum : {
            values : ['ikea','liddy','caressa','marcos'],
            // if the value doesn't match any one
            message : '{value} is not supported'
        }
    }
})

module.exports = mongoose.model('Product',schema)