const express = require('express');
const cors = require('cors');
require('dotenv').config();

//database....
require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares......
app.use(express.json());
app.use(cors());

//routes....
// app.get('/', (req, res) => {
//     res.send('<h1>App.get request</h1>');
// });

app.use('', require('./routes/recommendation'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

//Listening the express app.....
app.listen(PORT, () => {
    console.log(`Express app listening at PORT ${PORT}`);
});