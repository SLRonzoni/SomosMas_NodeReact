const ModelMessages= require('../models').Messages;
const ModelHelper=require('../helpers/modelHelper');
const baseController = require("./base.controller");

const getAllMessages= async (req, res) => {
  try{
     const paginated=new ModelHelper(ModelMessages)
     const {page}=req.query
     const pageLimit=100
     //const attributes=['name']

     const messagesPaginated= await paginated.findAndPaginate(page,pageLimit)
     
     res.status(200).json({previousPage:messagesPaginated.previousPage,
                           nextPage:messagesPaginated.nextPage,
                           messages:messagesPaginated.data})
   } catch(error) {
     res.status(500).json(error)
   }
};

const getOneMessage= async (req, res) => {                          
  return baseController.getModelById(req, res, ModelMessages)
};

const getMessagesByEmail= async (req, res) => {    
  const paramsEmail = req.params.email;
  try{
    const message= await ModelMessages.findAll({where:{email:paramsEmail}})
    if(!message){
      return res.status(404).json('email not found')
    } else{
      res.status(200).json(message)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const getMessagesByDate= async (req, res) => {    
  const paramsDate = req.params.date;
  try{
    const message= await ModelMessages.findAll({where:{createdAt:paramsDate}})
    if(!message){
      return res.status(404).json('date not found')
    } else{
      res.status(200).json(message)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const createMessage = async (req, res) => {
  try {
      const { name, email, message } = req.body

      const messages = await ModelMessages.create({
          name: name,
          email: email,
          message: message
      })

      res.status(201).json({msg:`${messages.name} ha enviado un mensaje`})

  } catch (error) {
      res.status(500).json({ error })
  }
}


const deleteMessage=async (req,res)=>{
  try{
    const message= await ModelMessages.findByPk(req.params.id) 
    
    if(!message){
      return res.status(404).json('id not found')
    } else{
      await ModelMessages.destroy({where: {id: req.params.id}})
      return res.status(200).json({msg:`message ${req.params.id} deleted`})
    }  
  } catch(error) {
    res.status(500).json(error)
  }
};

module.exports = {getAllMessages,
                  getOneMessage,
                  getMessagesByEmail,
                  getMessagesByDate,
                  createMessage,
                  deleteMessage};