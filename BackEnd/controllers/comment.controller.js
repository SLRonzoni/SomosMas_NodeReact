const {
    createModel,
    getAllModels,
    getModelById,
    updateModel,
    deleteModel
} = require("./base.controller");
const CommentModel = require("../models").Comment;

const createComment = async (req, res) =>
    await createModel(res, CommentModel, req.body);

const getAllComments = async (req, res) =>
    await getAllModels(req, res, CommentModel);

const getCommentById = async (req, res) => 
    await getModelById(req, res, CommentModel);    

const getCommentsByUser= async (req, res) => {    
    const paramsUser = req.params.user_id;
    try{
        const comments= await CommentModel.findAll({where:{user_id:paramsUser}})
        if(!comments){
        return res.status(404).json('user not found')
        } else{
        res.status(200).json(comments)
        }
    } catch(error) {
        res.status(500).json(error)
    }     
};

const updatedComment = async (req, res) =>
    await updateModel(req, res, CommentModel, req.body);

const deleteComment = async (req, res) =>
    await deleteModel(req, res, CommentModel);

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    getCommentsByUser,
    updatedComment,
    deleteComment
}