const { validateOrganization } = require("../validators");
const {
    createOrganization,
    getOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization
} = require("../controllers/organization.controller");
const { authenticatedUser, verifyIsAdmin, idExists } = require("../middlewares");


const express = require('express');
const router = express.Router();


router.post('/create',verifyIsAdmin, validateOrganization, createOrganization);
router.get('/public/:id', idExists ,getOrganizationById);

router.get('/', getOrganizations)
router.put('/public/:id',verifyIsAdmin, authenticatedUser, idExists ,updateOrganization);
router.delete('/:id',verifyIsAdmin, idExists ,deleteOrganization)

module.exports = router;
