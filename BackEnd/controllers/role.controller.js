const ModelRole = require('../models').Role;
const baseController = require("./base.controller")

const createRole = async( req, res ) => {
    console.log(req.body)
    const inputVars={name:req.body.name, description:req.body.description}
return baseController.createModel( res, ModelRole, inputVars) 
}

const getAllRoles = async( req, res ) => {
    return baseController.getAllModels(req, res, ModelRole)
}

const getRoleById = async( req, res ) => {
    return baseController.getModelById(req, res, ModelRole)
}

const getRoleByName= async (req, res) => {    
	const paramsName = req.params.name;
	try{
		const roles= await ModelRole.findAll({where:{name:paramsName}})
		if(!roles || roles==='' ){
		return res.status(404).json('name not found')
		} else{
		res.status(200).json(roles)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};

const deleteRole = async( req, res ) => {
    return baseController.deleteModel(req, res, ModelRole)
}

const updateRole = async( req, res ) => {
    const {name,description}=req.body
    const inputVars={name,description}
    return baseController.updateModel(req, res, ModelRole, inputVars) 
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  getRoleByName,
  deleteRole,
  updateRole
 };
