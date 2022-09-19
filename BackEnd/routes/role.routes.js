const express = require('express');
const router = express.Router();

const { validateRoles } = require('../validators');
const { authenticatedUser,verifyIsAdmin,idExists } = require('../middlewares');

const { getAllRoles,
        getRoleById,
        getRoleByName,
        createRole,
        updateRole,
        deleteRole } = require('../controllers/role.controller');

router.use(authenticatedUser , verifyIsAdmin)

router.get('/', getAllRoles);

router.get('/:id', idExists, getRoleById);

router.get('/byName/:name', getRoleByName);

router.post('/create', validateRoles , createRole);

router.put('/update/:id', idExists, validateRoles , updateRole);

router.delete('/del/:id', idExists, deleteRole);


module.exports = router;