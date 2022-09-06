var express = require('express');
var router = express.Router();


const {getAllUsers, updateUser, getUserId, deleteUser}= require('../controllers/users.controllers');
const { authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload } = require('../middlewares');



/* GET users listing. */
router.get('/',verifyIsAdmin, authenticatedUser, getAllUsers )
/* GET user by ID */
router.get('/:id', getUserId)
//update user
router.put('/update/:id', idExists, optionsFileUpload ,authenticatedUser, updateUser)
//delete user
router.delete('/del/:id', verifyIsAdmin,authenticatedUser, deleteUser)

module.exports = router;
