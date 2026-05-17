const { ObjectId } = require('mongodb');
const { getDB } = require('../data/db');

// GET all
const getAllContacts = async (req, res) => {
  try {
    const db = getDB();

    const contacts = await db
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single
const getSingleContact = async (req, res) => {
  try {
    const db = getDB();

    const contactId = new ObjectId(req.params.id);

    const contact = await db
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await getDB()
    .collection('contacts')
    .insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

// PUT
const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await getDB()
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

// DELETE
const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const response = await getDB()
    .collection('contacts')
    .deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred');
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};