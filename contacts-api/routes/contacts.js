const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Get all contacts'
*/
router.get('/', contactsController.getAllContacts);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Get single contact  by id'
*/
router.get('/:id', contactsController.getSingleContact);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Create contact'
*/
router.post('/', contactsController.createContact);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Update contact'
*/
router.put('/:id', contactsController.updateContact);

/* #swagger.tags = ['Contacts']
   #swagger.summary = 'Delete contact'
*/
router.delete('/:id', contactsController.deleteContact);

module.exports = router;