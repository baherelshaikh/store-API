const connect = require('./db/connect')
const Product = require('./models/product')
const Products = require('./products.json')
require('dotenv').config()

const connectDB = async ()=>{
    try {
        await connect(process.env.MONGO_URL)
        await Product.deleteMany()
        await Product.create(Products)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB()