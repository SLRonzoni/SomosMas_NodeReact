var express = require('express');
var router = express.Router();


const {getAllUsers, updateUser, getUserId, getUserEmail, deleteUser}= require('../controllers/users.controllers');
const { authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload } = require('../middlewares');



//GET users listing
router.get('/',verifyIsAdmin, authenticatedUser, getAllUsers )
//GET user by ID
router.get('/:id', getUserId)
//GET user by email
router.get('/:email', getUserEmail)
//UPDATE user
router.put('/:id', idExists, optionsFileUpload ,authenticatedUser, updateUser)
//DELETE user
router.delete('/:id', verifyIsAdmin,authenticatedUser, deleteUser)

module.exports = router;
