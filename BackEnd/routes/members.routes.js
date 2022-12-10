var express = require('express');
var router = express.Router();
const {validateMembers} =  require('../validators/members.validator')
const {verifyIsMemberAdmin} = require('../middlewares/member.middleware')
const { idExists, optionsFileUpload} = require('../middlewares')
const { getAllMember, getMemberById, createMember, updateMember, deleteMember} = require('../controllers/members.controller')


router.get('/',  getAllMember )
router.get('/:id',  idExists, getMemberById)
router.post('/', verifyIsMemberAdmin,optionsFileUpload, validateMembers, createMember)
router.put('/:id', verifyIsMemberAdmin, idExists,optionsFileUpload, validateMembers, updateMember)
router.delete('/:id',verifyIsMemberAdmin , idExists, deleteMember)


module.exports = router;

