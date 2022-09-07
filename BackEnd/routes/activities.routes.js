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

const {authenticatedUser, verifyIsAdmin } = require('../middlewares');
const { validateActivity } = require('../validators');
router.use(authenticatedUser)


router.post('', verifyIsAdmin, validateActivity,  createActivity)
router.get('', getAllActivities)
router.get('/:id', getActivityById)
router.get('/byName/:name',verifyIsAdmin, getActivitiesByName)
router.get('/byDate/:date', verifyIsAdmin, getActivitiesByDate)
router.put('/:id', verifyIsAdmin, validateActivity,  updateActivity)
router.delete('/:id', verifyIsAdmin,  deleteActivity)

module.exports = router;

