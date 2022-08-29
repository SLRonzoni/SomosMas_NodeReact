const express = require('express');
const router = express.Router();

const {verifyIsAdmin, idExists, optionsFileUpload  }=require('../middlewares');

const { validateCategories }=require('../validators')

const {getAllCategories,
       getOneCategory,
       getOneCategoryByName,
       createCategory,
       updateCategory,
       deleteCategory}=(require('../controllers/categories.controller'))

router.use(verifyIsAdmin)

router.get("/",  getAllCategories);

router.post("/create", optionsFileUpload ,validateCategories, createCategory);

router.get("/:id", idExists, getOneCategory);

router.get("/byName/:name", getOneCategoryByName);

router.put("/update/:id", idExists, optionsFileUpload ,validateCategories, updateCategory);

router.delete("/del/:id", deleteCategory);

module.exports = router;
