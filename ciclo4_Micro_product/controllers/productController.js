const mongoose = require('mongoose');
const parse = require('csv-parse')
const fs = require('fs')

const path = 'public/files/products.csv';

const Product = require('../models/product');

function ProductController() {
  const product = {};

  product.findAll = async () => {
    const products = await Product.find({});
    return products;
  }

  product.findOne = async (productCodigo) => {
    const productsFound = await Product.find({ _id: productCodigo });
    return productsFound;
  }

  product.insertOne = async (data) => {
    const newProduct = await Product.create(data);
    return newProduct;
  }

  product.updateOne = async (id, data) => {
    const productsUpdate = await Product.findByIdAndUpdate(id, { $set: data });
    return productsUpdate;
  }

  product.deleteAll = async () => {
    const del = await Product.deleteMany({});
    return del;
  }

  product.insertCsv = () => {
    const data = []
    return new Promise((resolve, reject) => {
      try {
        if (fs.existsSync(path)) {
          fs.createReadStream(path)
            .pipe(parse({ delimiter: ';' }))
            .on('data', (r) => {
              data.push(r);
            })
            .on('end', () => {
              const arregloJson = data.map((arregloPequeño) => {
                const productoJson = {
                  codigo_producto: arregloPequeño[0],
                  nombre_producto: arregloPequeño[1],
                  nit_proveedor: arregloPequeño[2],
                  precio_compra: arregloPequeño[3],
                  iva_compra: arregloPequeño[4],
                  precio_venta: arregloPequeño[5],
                }
                return productoJson;
              })
              const rta = Product.insertMany(arregloJson);
              resolve(rta);
            })
            .on('error', function (err) {
              reject(err.message)
            });
        }
      } catch (err) {
        console.error(err)
      }
    })
  }
  return product;
}

module.exports = ProductController();