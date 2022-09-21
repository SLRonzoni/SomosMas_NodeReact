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


router.get('/public', getAllTestimonials);

router.get('/public/:id', idExists, getTestimonialsById);

router.get('/public/byName/:name', getTestimonialsByName);

router.get('/public/byDate/:date', getTestimonialsByDate);

router.get('/',authenticatedUser, verifyIsAdmin, getAllTestimonials);

router.post('/',authenticatedUser, verifyIsAdmin, optionsFileUpload, validateTestimonial, createTestimonial);

router.put('/:id',authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload, validateUpdateTestimonial, updateTestimonial);

router.delete('/:id',authenticatedUser, verifyIsAdmin, idExists, deleteTestimonial);

module.exports = router;
