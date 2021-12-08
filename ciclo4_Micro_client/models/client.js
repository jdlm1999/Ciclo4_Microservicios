const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema({
  cedula_cliente: {
    type: Number,
    required: true
  },
  telefono_cliente: {
    type: String,
    required: true
  },
  nombre_cliente: {
    type: String,
    required: true
  },
  correo_cliente: {
    type: String,
    required: true
  },
  direccion_cliente: {
    type: String,
    required: true
  },

})

var Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;