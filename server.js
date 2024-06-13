const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
const apiRoutes = require('./routes/api');
const connectDB = require('./app/database/dbConfig.js');
const port = process.env.PORT || 4500;
connectDB();
app.use(bodyParser.json());
app.use('/', apiRoutes);
app.listen(port, (req, res) => {
    console.log(`INFO  Server running on  [http://localhost:${port}]`);

})