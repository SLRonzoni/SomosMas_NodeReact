const newsModel = require('../models').News;
const commentModel = require('../models').Comment;
//const { uploadToBucket } = require('../services/s3');

const {query} = require ('express');
const {Sequelize} = require('../models');
const { 
    getAllModels, 
    createModel,
    getModelById, 
    updateModel, 
    deleteModel 
} = require('./base.controller');


const getAllNews = async (req, res) =>{ 
    await getAllModels(req, res, newsModel);
};

const getByName= async (req, res) => {    
    const keyword=req.params.name
    const Op = Sequelize.Op
	try{
		const news= await newsModel.findAll({
            where: {name:{[Op.like]:`%${keyword}%`}}, 
            include: [{
                model: commentModel, as: "comments"
            }]
        })
        if(!news){
            return res.status(404).json('name not found')
        } else{
            res.status(200).json(news)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
 
};
	  
const getByDate= async (req, res) => {    
	const paramsDate = req.params.date;
	try{
		const news= await newsModel.findAll({where:{updatedAt:paramsDate}})
		if(!news){
		return res.status(404).json('date not found')
		} else{
		res.status(200).json(news)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};

const getByCategory= async (req, res) => {    
	const paramsCategory = req.params.categoryId;
	try{
		const news= await newsModel.findAll({where:{categoryId:paramsCategory}})
		if(!news){
		return res.status(404).json('category not found')
		} else{
		res.status(200).json(news)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};

const createNews = async (req,res) =>{
  //let img = req.files.image;
  let regularImglocation;
  try{
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://via.placeholder.com/600/51aa97`
    const inputVars={name:req.body.name,
        content:req.body.content,
        categoryId:req.body.categoryId,
        type:req.body.type,
        image:regularImglocation}
    await createModel(res, newsModel, inputVars);
  } catch (error) {        
    res.status(500).send(error);
  }
};

const updateNews = async (req, res) =>{
  //let img = req.files.image;
  let regularImglocation;
  try{
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://via.placeholder.com/600/51aa97`
    const inputVars={name:req.body.name,
        content:req.body.content,
        categoryId:req.body.categoryId,
        type:req.body.type,
        image:regularImglocation}
    await updateModel(req, res, newsModel, inputVars);
  } catch (error) {        
    res.status(500).send(error);
  }
};

const detailNews = async (req,res) =>{
    await getModelById(req, res, newsModel);
};

const deleteNews = async (req, res) =>{
    await deleteModel(req, res, newsModel);
};

const getAllCommentsOfNews = async (req, res) => {
    try{
        const commentsOfNews = await newsModel.findOne({ 
            where: { id: req.params.id }, 
            include: [{
                model: commentModel, as: "comments"
            }]
        })
        res.status(201).json(commentsOfNews.comments);
    }catch(error) {
        console.log(error)
        res.status(500).send(e.message);
    }
};

module.exports = {
    getAllNews,
    getByName,
    getByCategory,
    getByDate,
    createNews,
    detailNews,
    updateNews,
    deleteNews,
    getAllCommentsOfNews
}