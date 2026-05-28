const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe API',
    description: 'Recipe API documentation'
  },
  host: 'cse341-projects-r8m6.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

swaggerAutogen(outputFile, routes, doc);