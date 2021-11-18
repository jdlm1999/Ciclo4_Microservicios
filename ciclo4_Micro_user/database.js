const mongoose = require('mongoose');

const uri = process.env.DB_HOST;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(db => console.log('Database is Connected'))
  .catch(err => console.log(err));