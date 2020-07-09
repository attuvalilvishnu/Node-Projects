/* eslint-disable no-undef */
const express = require('express');

const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, resp) {
    resp.sendFile(`${__dirname}/index.html`);
});

app.listen('5000', () => console.log('listening in 5000..'));