const express = require('express');
const router = express.Router();
const Product = require('../controllers/productController');

router.get('/', async (req, res, next) => {
  try {
    const result = await Product.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.insertOne(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

