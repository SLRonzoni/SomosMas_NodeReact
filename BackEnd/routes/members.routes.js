var express = require('express');
var router = express.Router();
const {validateMembers} =  require('../validators/members.validator')
const {verifyIsMemberAdmin} = require('../middlewares/member.middleware')
const { idExists} = require('../middlewares')
const { getAllMember, getMemberById, createMember, updateMember, deleteMember} = require('../controllers/members.controller')


router.get('/',  getAllMember )
router.get('/:id',  idExists, getMemberById)
router.post('/create', verifyIsMemberAdmin, validateMembers, createMember)
router.put('/update/:id', verifyIsMemberAdmin, idExists, validateMembers, updateMember)
router.delete('/del/:id',verifyIsMemberAdmin , idExists, deleteMember)


module.exports = router;

