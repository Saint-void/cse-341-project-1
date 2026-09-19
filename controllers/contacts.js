const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving contacts.' });
  }
};

// GET single contact by id
const getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid contact id to find a contact.' });
    }

    const contactId = new ObjectId(id);
    const result = await mongodb.getDb().collection('contacts').findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while retrieving the contact.' });
  }
};

// POST create contact (all fields required)
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof email !== 'string' ||
      typeof favoriteColor !== 'string' ||
      typeof birthday !== 'string' ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !favoriteColor.trim() ||
      !birthday.trim()
    ) {
      return res.status(400).json({
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday.'
      });
    }

    const contact = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      favoriteColor: favoriteColor.trim(),
      birthday: birthday.trim()
    };

    const response = await mongodb.getDb().collection('contacts').insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while creating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while creating the contact.' });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid contact id to update a contact.' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof email !== 'string' ||
      typeof favoriteColor !== 'string' ||
      typeof birthday !== 'string' ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !favoriteColor.trim() ||
      !birthday.trim()
    ) {
      return res.status(400).json({
        message: 'All fields are required: firstName, lastName, email, favoriteColor, birthday.'
      });
    }

    const contactId = new ObjectId(id);
    const contact = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      favoriteColor: favoriteColor.trim(),
      birthday: birthday.trim()
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while updating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while updating the contact.' });
  }
};

// DELETE delete contact
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Must use a valid contact id to delete a contact.' });
    }

    const contactId = new ObjectId(id);
    const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    if (response.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || { message: 'Some error occurred while deleting the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Some error occurred while deleting the contact.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
