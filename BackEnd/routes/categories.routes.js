const express = require('express');
const router = express.Router();

const {verifyIsAdmin, idExists}=require('../middlewares');

const { validateCategories }=require('../validators')

const {getAllCategories,
       getOneCategory,
       createCategory,
       updateCategory,
       deleteCategory}=(require('../controllers/categories.controller'))

router.use(verifyIsAdmin)

router.get("/",  getAllCategories);

router.post("/create", validateCategories, createCategory);

router.get("/:id", idExists, getOneCategory);

router.put("/update/:id", idExists, validateCategories, updateCategory);

router.delete("/del/:id", deleteCategory);

module.exports = router;
