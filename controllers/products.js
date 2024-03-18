const Products = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    // const search = 'a'
    const product = await Products.find({
        // name: 'vase table'
        // name: {$regex : search, $options: 'i'}
    }).sort('-name price')
    res.status(200).json({product, nbHits: product.length})
}

const getAllProducts = async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters} = req.query
    const queryObject = {}
                                //Query and Projection operators
    if(name) queryObject.name = {$regex: name , $options: "i"} 

    if (featured) queryObject.featured = featured === 'true' ? true : false 

    if(company) queryObject.company = company

    //numericFilters
    if(numericFilters){
        // we want to make mongoose able to understand it
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        regEx = /\b(<|>|<=|>=|=)\b/g
        // regEx = /(<|>|<=|>=|=)/g
        filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const option = ['price', 'rating']
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if(option.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
        // just to see the object content
        console.log(queryObject)
    }

    // Sorting
    let result = Products.find(queryObject)
    if(sort) {
        const regSort = sort.split(',').join(' ')
        result = result.sort(regSort)
    }else{
        result = result.sort('createdAt')
    }

    // selecting certain fields
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // limit and the pages 
        // page number
        const page = Number(req.query.page) || 1
        // NO of products in each page
        const limit = Number(req.query.limit) || 10
        // How many products must i skip to be in this specific page ?! 
        const skip = (page - 1) * limit

    result.skip(skip).limit(limit)

    
    // sending the json file of result 
    const product = await result
    // const product = await Products.find(queryObject)
    res.status(200).json({product,nbHits: product.length})
}

module.exports = {getAllProducts,getAllProductsStatic}