const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pet Store API',
    description: 'API documentation for the Pet Store project'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);