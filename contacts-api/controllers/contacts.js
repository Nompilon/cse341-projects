const { ObjectId } = require('mongodb');
const { getDB } = require('../data/db');

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

module.exports = {
  getAllContacts,
  getSingleContact
};