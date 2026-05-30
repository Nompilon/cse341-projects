const { ObjectId } = require('mongodb');
const { getDB } = require('../data/index');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const db = getDB();

    const users = await db
      .collection('users')
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single
const getSingleUser = async (req, res) => {
  try {
    const db = getDB();

    const userId = new ObjectId(req.params.id);

    const user = await db
      .collection('users')
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST
const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      country: req.body.country,
      favoriteCuisine: req.body.favoriteCuisine,
      joinDate: req.body.joinDate
    };

    if (
      !user.firstName ||
      !user.lastName ||
      !user.username ||
      !user.email ||
      !user.country ||
      !user.favoriteCuisine ||
      !user.joinDate 
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const response = await getDB()
      .collection('users')
      .insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({
        message: 'Failed to create user.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      country: req.body.country,
      favoriteCuisine: req.body.favoriteCuisine,
      joinDate: req.body.joinDate
    };
    
    if (
      !user.firstName ||
      !user.lastName ||
      !user.username ||
      !user.email ||
      !user.country ||
      !user.favoriteCuisine ||
      !user.joinDate 
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const response = await getDB()
      .collection('users')
      .replaceOne({ _id: userId }, user);

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: 'User not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE
const deleteUser = async (req, res) => {
   try {
    const userId = new ObjectId(req.params.id);

    const response = await getDB()
      .collection('users')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: 'User not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};