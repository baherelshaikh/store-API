const express = require('express')
const app = express()
const connect = require('./db/connect')
const Products = require('./routes/products')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const PORT = process.env.PORT || 5000
require('dotenv').config()
//instead of using try catch with each route
require('express-async-errors')


app.use(express.json())
//routs 
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', Products);

app.use(notFound)
app.use(errorHandlerMiddleware)

const connectDB = async ()=>{
    try {
        await connect(process.env.MONGO_URL)
        app.listen(PORT,()=>{console.log('Server is listening on port 5000 ...')})
    } catch (err) {
        console.log(err)
    }
}
connectDB()