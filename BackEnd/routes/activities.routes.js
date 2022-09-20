var express = require('express');
var router = express.Router();

const {
    createActivity,
    getAllActivities,
    getActivityById,
    getActivitiesByName,
    getActivitiesByDate,
    updateActivity,
    deleteActivity
} = require('../controllers/activities.controller');

const {authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload } = require('../middlewares');
const { validateActivity } = require('../validators');

router.get('/public', getAllActivities)
router.get('/public/:id', idExists, getActivityById)
router.post('/create', authenticatedUser,verifyIsAdmin,optionsFileUpload , validateActivity,  createActivity)
router.get('/',authenticatedUser,verifyIsAdmin, getAllActivities)
router.get('/:id', authenticatedUser,idExists, getActivityById)
router.get('/byName/:name', getActivitiesByName)
router.get('/byDate/:date', verifyIsAdmin, getActivitiesByDate)
router.put('/update/:id',authenticatedUser, verifyIsAdmin,idExists,optionsFileUpload, validateActivity,  updateActivity)
router.delete('/del/:id',authenticatedUser, verifyIsAdmin, idExists, deleteActivity)

module.exports = router;

