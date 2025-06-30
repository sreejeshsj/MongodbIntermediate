const {insertingToProduct, getAllProductController, getProductAggregationController, getProductAnanlysisController} = require('../controllers/productController')
const express=require('express')

const router =  express.Router()

router.post('/add',insertingToProduct)
router.get('/fetch',getAllProductController)
router.get('/aggregate',getProductAggregationController)
router.get('/analys',getProductAnanlysisController)
module.exports=router