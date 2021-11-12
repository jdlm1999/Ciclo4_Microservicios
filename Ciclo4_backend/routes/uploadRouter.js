const express = require('express');
const uploadRouter = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const Product = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },

  filename: (req, file, cb) => {
    cb(null, 'products.csv')
  }
});

const ProductFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return cb(new Error('Solo puedes subir archivos csv!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: ProductFileFilter });


uploadRouter.post('/', upload.single('productFile'), async (req, res, next) => {
  try {
    await Product.insertCsv();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
  } catch (error) {
    console.log(error);
  }
})

module.exports = uploadRouter;