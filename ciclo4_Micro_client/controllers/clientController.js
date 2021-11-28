const Client = require('../models/client')

function ClientController() {
  const client = {};

  client.findAll = async () => {
    const clients = await Client.find({});
    return clients;
  }

  client.findOne = async (clientCodigo) => {
    const clientFound = await Client.find({ _id: clientCodigo });
    return clientFound;
  }

  client.insertOne = async (data) => {
    const newClient = await Client.create(data);
    return newClient;
  }

  client.updateOne = async (id, data) => {
    const clientUpdate = await Client.findByIdAndUpdate(id, { $set: data });
    return clientUpdate;
  }

  client.deleteOne = async (clientCedula) => {
    const clientDelete = await Client.findByIdAndRemove(clientCedula);
    return clientDelete;
  }

  return client;
}

module.exports = ClientController();