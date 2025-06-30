const ProductModel = require("../model/product");

const insertingToProduct = async (req, res) => {
  const products = [
    {
      name: "Wireless Mouse",
      category: "Electronics",
      price: 799,
      inStock: true,
      tags: ["wireless", "mouse", "computer"],
    },
    {
      name: "Water Bottle",
      category: "Kitchen",
      price: 299,
      inStock: true,
      tags: ["bottle", "steel", "eco-friendly"],
    },
    {
      name: "Yoga Mat",
      category: "Fitness",
      price: 999,
      inStock: false,
      tags: ["fitness", "mat", "exercise"],
    },
    {
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 1499,
      inStock: true,
      tags: ["speaker", "music", "bluetooth"],
    },
    {
      name: "Notebook",
      category: "Stationery",
      price: 120,
      inStock: true,
      tags: ["writing", "paper", "office"],
    },
  ];

  try {
    const result = await ProductModel.insertMany(products);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Product Add successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding product",
    });
  }
};

const getAllProductController= async(req,res)=>{
    try{
        const result= await ProductModel.find()
        res.status(200).json({
            success:true,
            message:"Products fetched successfully",
            data:result
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Something went while tring to retirive data"
        })
    }
}

const getProductAggregationController=async(req,res)=>{
    try{
        const result= await ProductModel.aggregate([
            {
                //stage1
                $match:{
                    inStock:true,
                    price :{$gte : 200 }
                }
            },
            {
                $group:{
                    _id:"$category",
                    avgPrice:{
                        $avg:"$price"
                    },
                    count:{
                        $sum:1
                    }

                }
            }
        ])

        res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            data:result
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Something went wrong while trying to aggregation"
        })
    }
}
const getProductAnanlysisController=async (req,res)=>{
    try{
            const result = await ProductModel.aggregate([
                {
                $match:{
                   'category':"Electronics"
                },

            }
            ,{
                $group:{
                    _id:null,
                    totalRevenu:{
                        $sum:"$price"
                    },
                    avgPrice:{
                        $avg:"$price"
                    },
                    maxProductPrice:{
                        $max:"$price"
                    },
                    minPRoductPrice:{
                        $min:"$price"
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    totalRevenu:1,
                    avgPrice:1,
                    maxProductPrice:1,
                    minPRoductPrice:1,
                    priceRange:{
                        $subtract:['$maxProductPrice','$minPRoductPrice']
                    }
                }
            }
        ])

        res.status(200).json({
            success:true,
            message:"Product Analyzed",
            data:result
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Somthing"
        })
    }
}

module.exports={
    insertingToProduct,
    getAllProductController,
    getProductAggregationController,
    getProductAnanlysisController
}
