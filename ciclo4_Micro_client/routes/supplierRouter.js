const express = require('express');
const router = express.Router();
const Supplier = require('../controllers/supplierController');

router.get('/', async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
})

router.get('/:supplierNit', async (req, res, next) => {
  try {
    const supplier = await Supplier.findOne(req.params.supplierNit);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(supplier);
  } catch (error) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const supplier = await Supplier.insertOne(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(supplier);
  } catch (error) {
    next(error);
  }
})

router.put('/:supplierNit', async (req, res, next) => {
  try {
    const supplier = await Supplier.updateOne(req.params.supplierNit, req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(supplier);
  } catch (error) {
    next(error);
  }
})

router.delete('/:supplierNit', async (req, res, next) => {
  try {
    const supplier = await Supplier.deleteOne(req.params.supplierNit);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(supplier);
  } catch (error) {

  }
})

module.exports = router;