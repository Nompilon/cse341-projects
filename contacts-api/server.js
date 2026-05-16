const express = require('express');
const { connectDB } = require('./db');

const app = express();

app.use(express.json());

app.use('/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});