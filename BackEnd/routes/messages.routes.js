const express = require('express');
const router = express.Router();

const {verifyIsAdmin, idExists }=require('../middlewares');

const {getAllMessages,
       getOneMessage,
       getMessagesByEmail,
       getMessagesByDate,
       deleteMessage}=(require('../controllers/messages.controller'))

router.use(verifyIsAdmin)

router.get("/",  getAllMessages);

router.get("/:id", idExists, getOneMessage);

router.get("/byEmail/:email", getMessagesByEmail);

router.get("/byDate/:date", getMessagesByDate);

router.delete("/:id", idExists,deleteMessage);

module.exports = router;
