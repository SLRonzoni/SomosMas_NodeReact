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
router.get('/public/byName/:name', getActivitiesByName)
router.get('/public/byDate/:date', getActivitiesByDate)

router.post('/', authenticatedUser,verifyIsAdmin,optionsFileUpload , validateActivity,  createActivity)
router.get('/',authenticatedUser,verifyIsAdmin, getAllActivities)
router.get('/:id', authenticatedUser,idExists, getActivityById)
router.put('/:id',authenticatedUser, verifyIsAdmin,idExists,optionsFileUpload, validateActivity,  updateActivity)
router.delete('/:id',authenticatedUser, verifyIsAdmin, idExists, deleteActivity)

module.exports = router;

