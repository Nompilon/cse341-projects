const { ObjectId } = require('mongodb');
const { getDB } = require('../data/db');

// GET all recipes
const getAllRecipes = async (req, res) => {
  try {
    const db = getDB();

    const recipes = await db
      .collection('recipes')
      .find()
      .toArray();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single
const getSingleRecipe = async (req, res) => {
  try {
    const db = getDB();

    const recipeId = new ObjectId(req.params.id);

    const recipe = await db
      .collection('recipes')
      .findOne({ _id: recipeId });

    if (!recipe) {
      return res.status(404).json({
        message: 'Recipe not found'
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST
const createRecipe = async (req, res) => {
  const recipe = {
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
    .collection('recipes')
    .insertOne(recipe);

  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

// PUT
const updateRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);

  const recipe = {
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
    .collection('recipes')
    .replaceOne({ _id: recipeId }, recipe);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

// DELETE
const deleteRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);

  const response = await getDB()
    .collection('recipes')
    .deleteOne({ _id: recipeId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};