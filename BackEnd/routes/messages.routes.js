const express = require('express');
const router = express.Router();

const {verifyIsAdmin, idExists }=require('../middlewares');

const {getAllMessages,
       getOneMessage,
       getMessagesByEmail,
       getMessagesByDate,
       createMessage,
       deleteMessage}=(require('../controllers/messages.controller'))


router.get("/",verifyIsAdmin,  getAllMessages);

router.get("/:id", idExists,verifyIsAdmin, getOneMessage);

router.get("/byEmail/:email",verifyIsAdmin, getMessagesByEmail);

router.get("/byDate/:date",verifyIsAdmin, getMessagesByDate);

router.post("/", createMessage);

router.delete("/:id", idExists,verifyIsAdmin,deleteMessage);

module.exports = router;
