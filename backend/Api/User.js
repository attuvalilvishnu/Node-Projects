const express = require('express');
const User = require('../DB/User');
const route = express.Router();

route.get('/', async (req, resp) => {
  try {
    const users = await User.find();
    resp.json(users);

  } catch (err) {
    resp.json({ msg: err });
  }
});

route.get('/:userId', async (req, resp) => {
  try {
    const user = await User.findById(req.params.userId);
    resp.json(user);
  } catch (error) {
    resp.json({ msg: error });
  }
});

route.post('/', async (req, res) => {
  const { firstName, lastName, id } = req.body;
  const user = new User({
    firstName, lastName, id
  });
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    res.json({ msg: err });
  }
});

route.delete('/:userId', async (req, resp) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.userId });
    resp.json(deletedUser);
  } catch (error) {
    resp.json({ msg: error });
  }
});

route.put('/:userId', async (req, resp) => {
  try {
    const updatedUser = await User.updateOne(
      { id: req.params.userId },
      { $set: { lastName: req.body.lastName } }
    );
    resp.json(updatedUser);
  } catch (error) {
    resp.json({ msg: error });
  }
});

module.exports = route;
