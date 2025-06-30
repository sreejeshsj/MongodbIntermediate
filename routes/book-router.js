const express=require('express')
const {createBookController,createAuthorController, fetchBookController} = require('../controllers/bookController')
const router=express.Router()

router.post('/author',createAuthorController)
router.post('/book',createBookController)
router.get('/fetch-book/:id',fetchBookController)


module.exports=router