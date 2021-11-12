const mongoose = require('mongoose');
const parse = require('csv-parse')
const fs = require('fs')

const Produ = require('../models/product');

function Product() {
  const product = {};

  product.findAll = async () => {
    const products = await Produ.find({});
    return products;
  }

  product.insertOne = async (data) => {
    const newProduct = await Produ.create(data);
    return newProduct;
  }

  product.deleteAll = async () => {
    const del = await Produ.deleteMany({});
    return del;
  }

  product.insertCsv = () => {
    const data = []
    return new Promise((resolve, reject) => {
      fs.createReadStream('public/files/products.csv')
        .pipe(parse({ delimiter: ';' }))
        .on('data', (r) => {
          data.push(r);
        })
        .on('end', () => {
          const arregloJson = data.map ((arregloPequeño) => {
            // console.log(arregloPequeño)
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
          // console.log(arregloJson);
          const rta = Produ.insertMany(arregloJson);
          // const newProduct = Produ.create(arregloJson[0]);
          resolve(rta);
        })
        .on('error', function (err) {
          reject(err.message)
        });
    })


  }
  return product;
}

module.exports = Product();