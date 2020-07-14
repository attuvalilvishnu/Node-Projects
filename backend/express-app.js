

const express = require('express');
const app = express();
app.use(express.json());
const userRoute = require('./route/user-route');
app.use('/api/users/',userRoute);


app.listen('3000', () => console.log('listening on 3000...'));


