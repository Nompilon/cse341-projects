const { ObjectId } = require('mongodb');
const { getDB } = require('../data/db');

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
  const user = {
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    cookTime: req.body.cookTime,
    difficulty: req.body.difficulty,
    servings: req.body.servings,
    author: req.body.author,
    instructions: req.body.instructions,
    createdAt: req.body.createdAt
  };

  const response = await getDB()
    .collection('users')
    .insertOne(user);

  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

// PUT
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const user = {
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    cookTime: req.body.cookTime,
    difficulty: req.body.difficulty,
    servings: req.body.servings,
    author: req.body.author,
    instructions: req.body.instructions,
    createdAt: req.body.createdAt
  };

  const response = await getDB()
    .collection('users')
    .replaceOne({ _id: userId }, user);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

// DELETE
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const response = await getDB()
    .collection('users')
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};