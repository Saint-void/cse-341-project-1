const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 Contacts API Documentation',
  },
  host: process.env.SWAGGER_HOST || 'cse-341-project-1.onrender.com',
  schemes: ['https', 'http'],
  definitions: {
    Contact: {
      _id: '66e8b2f9024f22f7b8849b3a',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-05-15'
    },
    ContactInput: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'johndoe@example.com',
      $favoriteColor: 'Blue',
      $birthday: '1990-05-15'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
