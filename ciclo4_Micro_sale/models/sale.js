const mongoose = require('mongoose');
const { Schema } = mongoose;

const saleSchema = new Schema({
  codigo_venta: {
    type: Number,
    required: true
  },
  cedula_cliente: {
    type: Number,
    required: true
  },
  cedula_usuario: {
    type: Number,
    required: true
  },
  iva_venta: {  
    type: Number,
    required: true
  },
  total_venta: {
    type: Number,
    required: true
  },
  valor_venta: {
    type: Number,
    required: true
  }
})

var Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;