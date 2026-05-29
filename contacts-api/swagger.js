const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API documentation'
  },
  host: 'cse341-projects-r8m6.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

swaggerAutogen(outputFile, routes, doc);