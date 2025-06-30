const BookModel=require('../model/Book')
const AuthorModel=require('../model/Author')

const createBookController=async (req,res)=>{
    try{
        const book=await BookModel.create(req.body)

        if (!book){
            res.status(401).json({
                success:false,
                message:"Please Trying again to create book"
            })
        }
        res.status(200).json({
            success:true,
            message:"Book is created successfully!",
            data:book
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Somthing went wrong while trying to create Book!"
        })
    }
}
const createAuthorController=async (req,res)=>{
    try{
        const author=await AuthorModel.create(req.body)

        if (!author){
            res.status(401).json({
                success:false,
                message:"Please Trying again to create new Author"
            })
        }
        res.status(200).json({
            success:true,
            message:"Author is created successfully!",
            data:author
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Somthing went wrong while trying to create new author!"
        })
    }
}
const fetchBookController = async ( req,res )=>{
    try{
        const book=await BookModel.findById(req.params.id).populate('author')
        res.status(200).json({
            success:true,
            message:"Book is fetched Successfully",
            data:book
        })
    }catch(err){

    }
}

module.exports={
    createAuthorController,createBookController,fetchBookController
}
