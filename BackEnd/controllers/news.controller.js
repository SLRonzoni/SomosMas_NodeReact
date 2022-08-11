const newsModel = require('../models').News;
const commentModel = require('../models').Comment;


const { query } = require('express');
const { Sequelize } = require('../models');
const { 
    getAllModels, 
    createModel,
    getModelById, 
    updateModel, 
    deleteModel 
} = require('./base.controller');


const getAllNews = async (req, res) =>{
    const keyword=req.query.name
    const Op = Sequelize.Op
    if(keyword!=='undefined'){
        try {
            const news = await newsModel.findAll({ 
                where: {name:{[Op.like]:`%${keyword}%`}}, 
                include: [{
                    model: commentModel, as: "comments"
                }]
            })
            res.status(200).json(news);
        } catch(error) {
            console.log(error)
            res.status(500).json(error.message);
        }
    } else {
        await getAllModels(req, res, newsModel);
    }
    
}

const createNews = async (req,res) =>{
    await createModel(res, newsModel, req.body);
}

const updateNews = async (req, res) =>{
    await updateModel(req, res, newsModel, req.body);
}

const detailNews = async (req,res) =>{
    await getModelById(req, res, newsModel);
}

const deleteNews = async (req, res) =>{
    await deleteModel(req, res, newsModel);
}

const getAllCommentsOfNews = async (req, res) => {
    try{
        const n = await newsModel.findOne({ 
            where: { id: req.params.id }, 
            include: [{
                model: commentModel, as: "comments"
            }]
        })
        res.status(201).json(n.comments);
    }catch(e) {
        console.log(e)
        res.status(500).send(e.message);
    }
}

module.exports = {
    getAllNews,
    createNews,
    detailNews,
    updateNews,
    deleteNews,
    getAllCommentsOfNews
}