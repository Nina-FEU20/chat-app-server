const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}!`));
