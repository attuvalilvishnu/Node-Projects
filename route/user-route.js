const express = require('express');
const route = express.Router();

const users = [{ id: 1, name: 'vishnu', age: 30 }, { id: 2, name: 'ani', age: 26 }];
route.get('/', (req, resp) => {
    resp.json(users);
});

route.get('/:id', (req, resp) => {
    try {
        const user = users.filter(user => user.id === parseInt(req.params.id))[0];
        resp.json(user);
    } catch (error) {
        resp.json(error);
    }
});

route.post('/', (req, resp) => {
    try {
        if (req.body.name === '' || req.body.name.length < 3)
            return resp.status(400).json('invalid Name');

        users.push({ name: req.body.name, age: req.body.age, id: users.length + 1 });
        resp.json(user);
    } catch (error) {
        resp.json(error);
    }
});

route.delete('/:id', (req, resp) => {
    try {
        const selecetdUser = users.find((user) => user.id === parseInt(req.params.id));
        if (!selecetdUser) return resp.status(404).json('id not found');
        const index = users.indexOf(selecetdUser);
        users.splice(index, 1);
        resp.json(selecetdUser);
    } catch (error) {
        resp.json(error);

    }
});

route.put('/:id', (req, resp) => {
    try {
        users.map((user) => {
            if (user.id === parseInt(req.params.id)) {
                user.name = req.body.name;
                user.age = req.body.age;
            }
        });
        console.log(users);
        resp.json(users);
    } catch (error) {
        resp.json(error);
    }

});

module.exports = route;