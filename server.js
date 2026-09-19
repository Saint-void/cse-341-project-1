const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./db/connect');

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.error('MongoDB connection error:', err);
  } else {
    console.log(`Connected to DB successfully`);
  }
});
