const Sale = require('../models/sale')

function SaleController() {
  const sale = {};

  sale.findAll = async () => {
    const sales = await Sale.find({});
    return sales;
  }

  sale.findOne = async (SaleCodigo) => {
    const SaleFound = await Sale.find({ _id: SaleCodigo });
    return SaleFound;
  }

  sale.insertOne = async (data) => {
    const newSale = await Sale.create(data);
    return newSale;
  }

  sale.updateOne = async (id, data) => {
    const SaleUpdate = await Sale.findByIdAndUpdate(id, { $set: data });
    return SaleUpdate;
  }

  sale.deleteOne = async (SaleNit) => {
    const SaleDelete = await Sale.findByIdAndRemove(SaleNit);
    return SaleDelete;
  }

  return sale;
}

module.exports = SaleController();