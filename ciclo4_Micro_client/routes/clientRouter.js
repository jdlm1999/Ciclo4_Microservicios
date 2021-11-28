const express = require('express');
const router = express.Router();
const Client = require('../controllers/clientController');

router.post('/', async (req, res, next) => {
  try {
    const clientCreate = await Client.insertOne(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(clientCreate);
  } catch (error) {
    console.log(error);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const clientList = await Client.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(clientList);
  } catch (error) {
    console.log(error);
  }
})

router.get('/:idSupplier', async (req, res, next) => {
  try {
    const clientGet = await Client.findOne(req.params.idSupplier);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(clientGet);
  } catch (error) {
    console.log(error);
  }
})

router.put('/:idSupplier', async (req, res, next) => {
  try {
    const clientUpdate = await Client.updateOne(req.params.idSupplier, req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(clientUpdate);
  } catch (error) {
    console.log(error);
  }
})

router.delete('/:idSupplier', async (req, res, next) => {
  try {
    const clientDelete = await Client.deleteOne(req.params.idSupplier);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(clientDelete);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;