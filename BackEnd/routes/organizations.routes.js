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

router.get('/public', getOrganizations)
router.get('/public/:id', idExists ,getOrganizationById);
router.post('/',verifyIsAdmin, validateOrganization, createOrganization);
router.put('/:id',verifyIsAdmin, authenticatedUser, idExists ,updateOrganization);
router.delete('/:id',verifyIsAdmin, idExists ,deleteOrganization)

module.exports = router;
