const { Router } = require('express')
const multer = require('multer')
const CardController = require('./Controller/CardController')
const CategoryController = require('./Controller/CategoryController');
const ImportController = require('./Controller/ImportController');

const router = new Router();
const multerConfig = multer();


router.post('/importcsv', multerConfig.single("file"), ImportController.store);
router.get('/cards', CardController.index);
router.post('/cards', CardController.store);
router.get('/category', CategoryController.index);
router.post('/category', CategoryController.store);

module.exports = router;