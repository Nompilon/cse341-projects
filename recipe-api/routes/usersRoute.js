const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { isManager } = require('../middleware/authenticate');

/* #swagger.tags = ['Users']
   #swagger.summary = 'Get all users'
*/
router.get('/', isManager,usersController.getAllUsers);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Get single user  by id'
*/
router.get('/:id', isManager,usersController.getSingleUser);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Create user'
*/
router.post('/', usersController.createUser);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Update user'
*/
router.put('/:id', isManager,usersController.updateUser);

/* #swagger.tags = ['Users']
   #swagger.summary = 'Delete user'
*/
router.delete('/:id', isManager,usersController.deleteUser);

module.exports = router;