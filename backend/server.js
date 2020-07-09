/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/Conncection');
const app = express();
const route = require('./Api/User');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/api/users', route);

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'Frontend/public')));


app.get('/', function (req, resp) {
    resp.sendFile(`${__dirname}/Frontend/index.html`);
});

connectDB();
app.listen('3000', () => console.log('listening in 3000..'));