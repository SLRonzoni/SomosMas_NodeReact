var express = require('express');
var router = express.Router();

const {getAllDonations, createDonation, getDonationId, getAllDonationsByPayForm,
      getAllDonationsByEmail,getAllDonationsByCreate, deleteDonation, paymentsStripe, 
      paymentsMePa}= require('../controllers/donations.controllers');

const { authenticatedUser, verifyIsAdmin, idExists} = require('../middlewares');


router.get('/',verifyIsAdmin, authenticatedUser, getAllDonations)

router.get('/:id',idExists, getDonationId)

router.get('/byPayForm/:payForm', getAllDonationsByPayForm)
router.get('/byEmail/:userEmail', getAllDonationsByEmail)
router.get('/byDate/:create', getAllDonationsByCreate)

router.post('/',createDonation)

router.post('/paymentsStripe',paymentsStripe)
router.post('/paymentsMePa',paymentsMePa)

router.delete('/:id', verifyIsAdmin,authenticatedUser, deleteDonation)

module.exports = router;