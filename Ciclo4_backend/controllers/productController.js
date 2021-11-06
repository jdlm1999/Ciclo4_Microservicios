const mongoose = require('mongoose');

const Produ = require('../models/product');

function Product() {
  const product = {};

  product.findAll = async () => {
    const products = await Produ.find({});
    return products;
  }

  product.insertOne =  async (data) => {
    const newProduct = await Produ.create(data);
    return newProduct;
  }

  return product;
}

module.exports = Product();