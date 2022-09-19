const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  getTestimonialsById,
  getTestimonialsByDate,
  getTestimonialsByName,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonials.controller');

const { authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload } = require("../middlewares");

const { validateTestimonial, validateUpdateTestimonial } = require('../validators');

router.use(authenticatedUser, verifyIsAdmin);

router.get('/', getAllTestimonials);



router.get('/:id', idExists, getTestimonialsById)

router.get('/byName/:name', getTestimonialsByName)

router.get('/byDate/:date', getTestimonialsByDate)

router.post('/', optionsFileUpload, validateTestimonial, createTestimonial);

router.put('/:id', idExists, optionsFileUpload, validateUpdateTestimonial, updateTestimonial);

router.delete('/:id', idExists, deleteTestimonial);

module.exports = router;
