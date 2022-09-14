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

const { verifyIsAdmin, idExists } = require('../middlewares');
const { validateNews } = require('../validators');

router.get('/', getAllNews);

router.get('/byDate/:date', getByDate);
router.get('/byName/:name', getByName);
router.get('/byCategory/:categoryId', getByCategory);

router.get('/:id', detailNews);

router.get('/:id/comments', idExists ,getAllCommentsOfNews);

router.post('/create/' ,  verifyIsAdmin,validateNews,createNews);
router.put('/update/:id' , idExists ,verifyIsAdmin,validateNews, updateNews);
router.delete('/del/:id', idExists ,verifyIsAdmin,deleteNews);



module.exports = router;