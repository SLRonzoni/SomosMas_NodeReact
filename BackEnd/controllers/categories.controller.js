const ModelCategories= require('../models').Categories;
const ModelNews=require('../models').News;
const ModelHelper=require('../helpers/modelHelper');
const baseController = require("./base.controller");
//const { uploadToBucket } = require('../services/s3');

const getAllCategories= async (req, res) => {
  try{
     const paginated=new ModelHelper(ModelCategories)
     const {page}=req.query
     const pageLimit=100
     //const attributes=['name']

     const categoriesPaginated= await paginated.findAndPaginate(page,pageLimit)
     
     res.status(200).json({previousPage:categoriesPaginated.previousPage,
                           nextPage:categoriesPaginated.nextPage,
                           categories:categoriesPaginated.data})
   } catch(error) {
     res.status(500).json(error)
   }
};

const getOneCategory= async (req, res) => {                          
  return baseController.getModelById(req, res, ModelCategories)
};

const getOneCategoryByName= async (req, res) => {    
  const paramsName = req.params.name;
  try{
    const category= await ModelCategories.findOne({where:{name:paramsName}})
    if(!category){
      return res.status(404).json('name not found')
    } else{
      res.status(200).json(category)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const createCategory= async (req,res)=> { 
  //let img = req.files.image;
  let regularImglocation;
  try{
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://via.placeholder.com/600/51aa97`
    const inputVars={name:req.body.name,
                    description:req.body.description,
                    image:regularImglocation}
    return baseController.createModel(res, ModelCategories, inputVars) 
  } catch (error) {        
    res.status(500).send(error);
  }
};

const updateCategory=async (req,res)=>{
  let img = req.files.image;
  let regularImglocation;
  try{
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://via.placeholder.com/600/51aa97`
   
    const inputVars={name:req.body.name,
                     description:req.body.description,
                     image:regularImglocation} 
    return baseController.updateModel(req, res, ModelCategories, inputVars )
  } catch (error) {        
    res.status(500).send(error);
  }
};

const deleteCategory=async (req,res)=>{
  try{
    const category= await ModelCategories.findByPk(req.params.id) 
    
    if(!category){
      return res.status(404).json('id not found')
    } else{
      const findNews=await ModelNews.findOne({where:{categoryId:category.id}})
      if(findNews!==null){
        return res.status(403).json({msg:"the category has news associated, can't delete it !"})
      } else {
        const delCategory=await ModelCategories.destroy({where: {id: req.params.id}})
        return res.status(200).json({msg:`category ${req.params.id} deleted`})
      }
    }  
  } catch(error) {
    res.status(500).json(error)
  }
};

module.exports = {getAllCategories,
                  getOneCategory,
                  getOneCategoryByName,
                  createCategory,
                  updateCategory,
                  deleteCategory};