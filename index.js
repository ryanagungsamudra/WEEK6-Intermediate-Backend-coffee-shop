require('dotenv').config();

const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const cors = require('cors');
const router = require('./src/routes/index');

// menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// menerima json
app.use(json());
// CORS (Cross-origin resource sharing)
app.use(cors());
// menambahkan route (prefix, nama router)
app.use('/api/', router)

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "NOT FOUND!",
  });
});

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`Server successfully running on port ${port}`);
});
