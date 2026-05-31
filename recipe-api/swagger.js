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
const routes = ['./server.js'];
//const routes = ['./routes/index.js', './routes/*.js'];

swaggerAutogen(outputFile, routes, doc);