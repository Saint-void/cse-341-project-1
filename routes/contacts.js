const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get(
  '/',
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Retrieve a list of all contacts from the database.'
    #swagger.responses[200] = {
        description: 'List of contacts retrieved successfully',
        schema: [{ $ref: '#/definitions/Contact' }]
    }
  */
  contactsController.getAll
);

// GET single contact by id
router.get(
  '/:id',
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get contact by ID'
    #swagger.description = 'Retrieve a single contact by its ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: '24-character hexadecimal MongoDB ObjectId of the contact',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Contact retrieved successfully',
        schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[400] = {
        description: 'Invalid contact ID'
    }
    #swagger.responses[404] = {
        description: 'Contact not found'
    }
  */
  contactsController.getSingle
);

// POST create contact
router.post(
  '/',
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Create a new contact in the database. All fields are required.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Contact data to create',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
    }
    #swagger.responses[201] = {
        description: 'Contact created successfully',
        schema: { id: '66e8b2f9024f22f7b8849b3a' }
    }
    #swagger.responses[400] = {
        description: 'All fields are required'
    }
  */
  contactsController.createContact
);

// PUT update contact
router.put(
  '/:id',
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact by ID'
    #swagger.description = 'Update an existing contact by its ID. All fields are required.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: '24-character hexadecimal MongoDB ObjectId of the contact to update',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated contact data',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
    }
    #swagger.responses[204] = {
        description: 'Contact updated successfully (No Content)'
    }
    #swagger.responses[400] = {
        description: 'Invalid contact ID or missing fields'
    }
    #swagger.responses[404] = {
        description: 'Contact not found'
    }
  */
  contactsController.updateContact
);

// DELETE contact
router.delete(
  '/:id',
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact by ID'
    #swagger.description = 'Delete a contact from the database by its ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: '24-character hexadecimal MongoDB ObjectId of the contact to delete',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Contact deleted successfully'
    }
    #swagger.responses[400] = {
        description: 'Invalid contact ID'
    }
    #swagger.responses[404] = {
        description: 'Contact not found'
    }
  */
  contactsController.deleteContact
);

module.exports = router;
