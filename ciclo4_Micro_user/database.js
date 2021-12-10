const mongoose = require('mongoose');

const Bogota = process.env.DB_HOST;
const all = process.env.DB_HOST_All;

mongoose.connect(Bogota, {
  dbName: process.env.DB_BOGOTA,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(db => console.log('Database sales is Connected'))
  .catch(err => console.log(err));
