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

router.get('/:idSupplier', async (req, res, next) => {
  try {
    const productGet = await Sale.findOne(req.params.idSupplier);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(productGet);
  } catch (error) {
    console.log(error);
  }
})

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

router.put('/:idSupplier', async (req, res, next) => {
  try {
    const productsUpdate = await Sale.updateOne(req.params.idSupplier, req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(productsUpdate);
  } catch (error) {
    console.log(error);
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const resp = await Product.deleteAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  } catch (error) {
    res.json(error);
  }
})

module.exports = router;

