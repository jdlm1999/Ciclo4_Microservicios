const { text } = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema({
  nit_proveedor: {
    type: Number,
    required: true
  },
  ciudad_proveedor: {
    type: String,
    required: true
  },
  direccion_proveedor: {
    type: String,
    required: true
  },
  nombre_proveedor: {
    type: String,
    required: true
  },
  telefono_proveedor: {
    type: String,
    required: true
  }
})

var Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;