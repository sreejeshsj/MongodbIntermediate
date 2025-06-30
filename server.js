const express=require('express')
const toconnectDB=require('./database/db')
const productRouter=require('./routes/product-router')
const bookRouter=require('./routes/book-router')
require('dotenv').config()
const app=express()

//middleware
app.use(express.json())

//connection
toconnectDB()

app.use('/api/product',productRouter)
app.use('/api/ref',bookRouter)
port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server Started at Port ${port}`)
})