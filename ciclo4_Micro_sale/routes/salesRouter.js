const express = require('express');
const router = express.Router();
const Sale = require('../controllers/salesController');

router.post('/', async (req, res, next) => {
  try {
    const saleCreate = await Sale.insertOne(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(saleCreate);
  } catch (error) {
    console.log(error);
  }
})
router.get('/', async (req, res, next) => {
  try {
    const saleList = await Sale.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(saleList);
  } catch (error) {
    console.log(error);
  }
})
router.get('/:idSupplier', async (req, res, next) => {
  try {
    const saleGet = await Sale.findOne(req.params.idSupplier);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(saleGet);
  } catch (error) {
    console.log(error);
  }
})
router.put('/:idSupplier', async (req, res, next) => {
  try {
    const saleUpdate = await Sale.updateOne(req.params.idSupplier, req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(saleUpdate);
  } catch (error) {
    console.log(error);
  }
})
router.delete('/:idSupplier', async (req, res, next) => {
  try {
    const saleDelete = await Sale.deleteOne(req.params.idSupplier);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(saleDelete);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
