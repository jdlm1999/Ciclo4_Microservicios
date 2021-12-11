const mongoose = require('mongoose');

const uri = process.env.DB_HOST;

mongoose.connect("mongodb://mongo/botota", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(db => console.log('Database Clients is Connected'))
  .catch(err => console.log(err));