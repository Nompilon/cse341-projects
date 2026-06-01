const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const { isAuthenticated} = require('../middleware/authenticate')

/* #swagger.tags = ['Recipes']
   #swagger.summary = 'Get all recipes'
*/
router.get('/', recipesController.getAllRecipes);

/* #swagger.tags = ['Recipes']
   #swagger.summary = 'Get single recipe  by id'
*/
router.get('/:id', recipesController.getSingleRecipe);

/* #swagger.tags = ['Recipes']
   #swagger.summary = 'Create recipe'
*/
router.post('/', isAuthenticated, recipesController.createRecipe);

/* #swagger.tags = ['Recipes']
   #swagger.summary = 'Update recipe'
*/
router.put('/:id', isAuthenticated, recipesController.updateRecipe);

/* #swagger.tags = ['Recipes']
   #swagger.summary = 'Delete recipe'
*/
router.delete('/:id', isAuthenticated, recipesController.deleteRecipe);

module.exports = router;