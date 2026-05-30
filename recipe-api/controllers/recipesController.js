const { ObjectId } = require('mongodb');
const { getDB } = require('../data/index');

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
  try {
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

    if (
      !recipe.recipeName ||
      !recipe.category ||
      !recipe.ingredients ||
      !recipe.cookTime ||
      !recipe.difficulty ||
      !recipe.servings ||
      !recipe.author ||
      !recipe.instructions
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }

    const response = await getDB()
      .collection('recipes')
      .insertOne(recipe);

    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({
        message: 'Failed to create recipe.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT
const updateRecipe = async (req, res) => {
  try {
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

    if (
      !recipe.recipeName ||
      !recipe.category ||
      !recipe.ingredients ||
      !recipe.cookTime ||
      !recipe.difficulty ||
      !recipe.servings ||
      !recipe.author ||
      !recipe.instructions
    ) {
      return res.status(400).json({
        message: 'All fields are required.'
      });
    }
    const response = await getDB()
      .collection('recipes')
      .replaceOne({ _id: recipeId }, recipe);

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: 'Recipe not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
    
// DELETE
const deleteRecipe = async (req, res) => {
  try{
    const recipeId = new ObjectId(req.params.id);

    const response = await getDB()
      .collection('recipes')
      .deleteOne({ _id: recipeId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: 'Recipe not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};