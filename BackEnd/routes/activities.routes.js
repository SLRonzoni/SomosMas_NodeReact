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
router.use(authenticatedUser)


router.post('/create', verifyIsAdmin,optionsFileUpload , validateActivity,  createActivity)
router.get('/', getAllActivities)
router.get('/:id', idExists, getActivityById)
router.get('/byName/:name', getActivitiesByName)
router.get('/byDate/:date', verifyIsAdmin, getActivitiesByDate)
router.put('/update/:id', verifyIsAdmin,idExists,optionsFileUpload, validateActivity,  updateActivity)
router.delete('/del/:id', verifyIsAdmin, idExists, deleteActivity)

module.exports = router;

