const express = require('express');
const UserService = require('../services/user');
const userRouter = express.Router();
module.exports = userRouter;

// Create user
userRouter.post('/', (req, res) => {
  const { name, email, uid} = req.body;
  const user = { name, email, uid, cash: 5000};

  UserService.create(user)
    .then(user => {
        res.json({ created: user });
    })
    .catch(err => {
        res.status(404).json({ Error: err.toString() });
    });
})

// Get user by id
userRouter.get('/id/:id', (req, res) => {
  const { id } = req.params;
  UserService.getUserByID(id)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(404).json({ Error: err.toString() });
    });
});

// Get user by email
userRouter.get('/email/:email', (req, res) => {
  const { email } = req.params;
  UserService.getUserByEmail(email)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(404).json({ Error: err.toString() });
    });
});

// Update user by id
userRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, cash } = req.body;
  UserService.updateUserByID(id, {name, email, cash})
    .then(user => {
        res.json({ updated: user });
    })
    .catch(err => {
        res.status(404).json({ Error: err.toString() });
    });
});

// Delete user by id
userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  UserService.deleteUser(id)
    .then(user => {
        res.json({ deleted: user });
    })
    .catch(err => {
        res.status(404).json({ Error: err.toString() });
    });
});