const express = require('express');
const router = express.Router();

const {
  getAllContacts,
  getSingleContact
} = require('../controllers/contacts');

router.get('/', getAllContacts);
router.get('/:id', getSingleContact);

module.exports = router;