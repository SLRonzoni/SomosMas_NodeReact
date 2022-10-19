const express = require("express");
const router = express();

const { 
    getAllNews, 
    detailNews,
    createNews,
    updateNews,
    deleteNews,
    getAllCommentsOfNews,
    getByDate,
    getByName,
    getByCategory
} = require('../controllers/news.controller');

const { verifyIsAdmin, idExists , optionsFileUpload} = require('../middlewares');
const { validateNews } = require('../validators');

router.get('/', getAllNews);

router.get('/byDate/:date', getByDate);
router.get('/byName/:name', getByName);
router.get('/byCategory/:categoryId', getByCategory);

router.get('/:id', detailNews);

router.get('/:id/comments', idExists ,getAllCommentsOfNews);

router.post('/' ,  verifyIsAdmin,optionsFileUpload,validateNews,  createNews);
router.put('/:id' , idExists ,verifyIsAdmin,optionsFileUpload,validateNews, updateNews);
router.delete('/:id', idExists ,verifyIsAdmin,deleteNews);



module.exports = router;