const mongoose = require('mongoose');

const Bogota = process.env.DB_HOST;
const all = process.env.DB_HOST_All;

mongoose.connect("mongodb://mongo/botota", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(db => console.log('Database sales Bogota is Connected'))
  .catch(err => console.log(err));
