const Supplier = require('../models/supplier');

function Supplie() {
  const supplier = {};

  supplier.findAll = async () => {
    const suppliers = await Supplier.find({});
    return suppliers;
  }

  supplier.findOne = async (supplierNit) => {
    const supplierFound = await Supplier.find({ _id: supplierNit });
    return supplierFound;
  }

  supplier.insertOne = async (data) => {
    const newSupplier = await Supplier.create(data);
    return newSupplier;
  }

  supplier.updateOne = async (id, data) => {
    const supplierUpdate = await Supplier.findByIdAndUpdate(id, { $set: data });
    return supplierUpdate;
  }

  supplier.deleteOne = async (supplierNit) => {
    const supplierDelete = await Supplier.findByIdAndRemove(supplierNit);
    return supplierDelete;
  }
  return supplier;
}

module.exports = Supplie();