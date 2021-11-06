const { text } = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  codigo_producto: {
    type: Number,
    required: true
  },
  nombre_producto: {
    type: String,
    required: true
  },
  nit_proveedor: {
    type: Number,
    required: true
  },
  precio_compra: {
    type: Number,
    required: true
  },
  iva_compra: {
    type: Number,
    required: true
  },
  precio_venta: {
    type: Number,
    required: true
  }
})

var Product = mongoose.model('Product', productSchema);

module.exports = Product;