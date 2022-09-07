const {
	getAllModels,
    getModelById,
	createModel,
    updateModel,
    deleteModel
} = require('../controllers/base.controller');

const ActivityModel = require("../models").Activity;

const createActivity = async (req, res) => { 
	const { name, content, image } = req.body;
	await createModel(res, ActivityModel, { name, content, image });
}

const getAllActivities = async (req, res) => 
	await getAllModels(req, res, ActivityModel);

const getActivityById = async (req, res) => 
	await getModelById(req, res, ActivityModel);


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
	await updateModel(req, res, ActivityModel, { name, content, image });
}
	

const deleteActivity = async (req, res) => 
	await deleteModel(req, res, ActivityModel);

module.exports = {
	getAllActivities,
	getActivityById,
	getActivitiesByName,
	getActivitiesByDate,
	createActivity,
	updateActivity,
	deleteActivity,
};
