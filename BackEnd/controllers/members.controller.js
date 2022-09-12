const ModelMember = require('../models').Member;
const baseController = require("./base.controller")
//const { uploadToBucket } = require('../services/s3');

const getAllMember = async (req, res) => {
    return baseController.getAllModels(req, res, ModelMember)
}

const getMemberById = async (req, res) => {
    return baseController.getModelById(req, res, ModelMember)
}

const createMember = async (req, res) =>{
    const {name, facebookUrl, instagramUrl, linkedinUrl, description} = req.body;
    //let img = req.files.image;
    let regularImglocation;
    try{
        //regularImglocation = await uploadToBucket(img);
        regularImglocation=`https://via.placeholder.com/600/51aa97`
        const inputVars = {name, facebookUrl, instagramUrl, linkedinUrl, image:regularImglocation, description}
        return baseController.createModel(res, ModelMember, inputVars)
    } catch (error) {        
    res.status(500).send(error);
  }

}

const updateMember = async (req, res) =>{
    const {name, facebookUrl, instagramUrl, linkedinUrl, description} = req.body;
    //let img = req.files.image;
    let regularImglocation;
    try{
        //regularImglocation = await uploadToBucket(img);
        regularImglocation=`https://via.placeholder.com/600/61a65`
        const inputVars = {name, facebookUrl, instagramUrl, linkedinUrl, image:regularImglocation, description}
        return baseController.updateModel(req, res, ModelMember, inputVars)
    } catch (error) {        
        res.status(500).send(error);
  }
}

const deleteMember = async (req, res) =>{
    return baseController.deleteModel(req, res, ModelMember)
}


module.exports = {
    getAllMember,
    createMember,
    updateMember,
    deleteMember,
    getMemberById
}