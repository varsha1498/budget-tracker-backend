const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 

dotenv.config({path: './config/config.env'});

connectDB();

const transactions = require('./routes/transactions.js');
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors({
    origin: 'https://vast-wave-09824.herokuapp.com',
    credentials: true

}));

app.use(express.json());


if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "client/build")));
app.use('/api/v1/transactions', transactions);
app.use('/',authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on  PORT: ${PORT}`));