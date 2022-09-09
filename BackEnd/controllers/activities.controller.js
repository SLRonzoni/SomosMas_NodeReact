const baseController= require('./base.controller');
const ActivityModel = require("../models").Activity;
//const { uploadToBucket } = require('../services/s3');

const createActivity = async (req, res) => { 
	//let img = req.files.image;
	let regularImglocation;
	try{
	  //regularImglocation = await uploadToBucket(img);
	  regularImglocation=`https://via.placeholder.com/600/51aa97`
	  const inputVars={name:req.body.name,
					  content:req.body.content,
					  image:regularImglocation}
	  return baseController.createModel(res, ActivityModel, inputVars);
    } catch(error) {
	  res.status(500).json(error)
    }
};

const getAllActivities = async (req, res) => {
	return baseController.getAllModels(req, res, ActivityModel);
};

const getActivityById = async (req, res) => {
	return baseController.getModelById(req, res, ActivityModel);
};

const getActivitiesByName= async (req, res) => {    
	const paramsName = req.params.name;
	try{
		const activities= await ActivityModel.findAll({where:{name:paramsName}})
		if(!activities){
		return res.status(404).json('name not found')
		} else{
		res.status(200).json(activities)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};
	  
const getActivitiesByDate= async (req, res) => {    
	const paramsDate = req.params.date;
	try{
		const activities= await ActivityModel.findAll({where:{updatedAt:paramsDate}})
		if(!activities){
		return res.status(404).json('date not found')
		} else{
		res.status(200).json(activities)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};


const updateActivity = async (req, res) => {
	const { name, content, image } = req.body;
	return baseController.updateModel(req, res, ActivityModel, { name, content, image });
}
	

const deleteActivity = async (req, res) => {
	return baseController.deleteModel(req, res, ActivityModel);
};

module.exports = {
	getAllActivities,
	getActivityById,
	getActivitiesByName,
	getActivitiesByDate,
	createActivity,
	updateActivity,
	deleteActivity
};
