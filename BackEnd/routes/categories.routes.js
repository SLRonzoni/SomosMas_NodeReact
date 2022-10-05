const express = require('express');
const router = express.Router();

const {verifyIsAdmin, idExists, optionsFileUpload  }=require('../middlewares');

const { validateCategories }=require('../validators')

const {getAllCategories,
       getOneCategory,
       getOneCategoryPublic,
       getOneCategoryByName,
       createCategory,
       updateCategory,
       deleteCategory}=(require('../controllers/categories.controller'))

router.get("/public/:id", idExists, getOneCategoryPublic);

router.get("/", getAllCategories);

router.post("/create", verifyIsAdmin,optionsFileUpload ,validateCategories, createCategory);

router.get("/:id",verifyIsAdmin, idExists, getOneCategory);

router.get("/byName/:name",verifyIsAdmin, getOneCategoryByName);

router.put("/update/:id", verifyIsAdmin,idExists, optionsFileUpload ,validateCategories, updateCategory);

router.delete("/del/:id",verifyIsAdmin, deleteCategory);

module.exports = router;
