const TestimonialModel = require("../models").Testimonial;
const { uploadToBucket } = require('../services/s3');
const BaseController = require("./base.controller");

//Create a testimonial
const createTestimonial = async (req, res) => {
    let img = req.files.image;
    let regularImglocation;
    try {
        regularImglocation = await uploadToBucket(img);
        const inputVars = {
            name: req.body.name, 
            image: regularImglocation, 
            content: req.body.content
        };
        return BaseController.createModel(res, TestimonialModel, inputVars);
    } catch (error) {        
        res.status(500).send(error);
    }
};

const getTestimonialsById =  async (req, res) => {
    return BaseController.getModelById(req, res, TestimonialModel)
};


const getTestimonialsByName= async (req, res) => {    
    const paramsName = req.params.name;
    try{
      const testimonial= await TestimonialModel.findAll({where:{name:paramsName}})
      if(!testimonial){
        return res.status(404).json('name not found')
      } else{
        res.status(200).json(testimonial)
      }
    } catch(error) {
      res.status(500).json(error)
    }     
  };

  const getTestimonialsByDate= async (req, res) => {    
	const paramsDate = req.params.date;
	try{
		const testimonial= await TestimonialModel.findAll({where:{createdAt:paramsDate}})
		if(!testimonial){
		return res.status(404).json('date not found')
		} else{
		res.status(200).json(testimonial)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};

const getAllTestimonials = async (req, res) => {
    return BaseController.getAllModels(req, res, TestimonialModel);
};


const updateTestimonial = async (req, res) => {
    const testimonialId = req.params.id;
    let regularImglocation;   
    try {
        const editTestimonial = await TestimonialModel.findByPk(testimonialId)
        if (!editTestimonial) {
            return res.status(404).send({
                msg: 'Invalid testimonial id'
            })
        }
        if( req.files){
            let img = req.files.image;
            regularImglocation = await uploadToBucket(img);
        }
        if(editTestimonial){
            editTestimonial.update({                
                name: !req.body.name ? editTestimonial.name: req.body.name,                                
                image: !req.files? editTestimonial.image: regularImglocation,
                content: !req.body.content ? editTestimonial.content : req.body.content
            });
            res.status(201).send(editTestimonial)
        }else {
            res.status(404).send({
                msg: 'Testimonial not found!'                
            })
        }              
    } catch (error) {
        res.status(500).send(error);        
    }
};

const deleteTestimonial = async (req, res) => {
    return BaseController.deleteModel(req, res, TestimonialModel);
};

module.exports = {
    createTestimonial,
    getTestimonialsById,
    getTestimonialsByName,
    getTestimonialsByDate,
    getAllTestimonials,
    updateTestimonial,
    deleteTestimonial
}



