const express = require('express');
const router = express.Router();
const {
    createComment,
    getAllComments,
    getCommentById,
    getCommentsByUser,
    updatedComment,
    deleteComment
} = require('../controllers/comment.controller');

const { authenticatedUser, verifyIsCommentsAdmin, idExists} = require('../middlewares');
const { validateComments } = require('../validators');


router.get('/', getAllComments)
router.get('/:id', idExists, getCommentById)
router.get('/byUser/:user_id',authenticatedUser, verifyIsCommentsAdmin, getCommentsByUser)
router.post('/', authenticatedUser,verifyIsCommentsAdmin, validateComments, createComment)
router.put('/:id',authenticatedUser, verifyIsCommentsAdmin, idExists, validateComments, updatedComment)
router.delete('/:id',authenticatedUser, verifyIsCommentsAdmin, idExists, deleteComment)

module.exports = router;