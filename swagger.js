const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pet Store API',
    description: 'API documentation for the Pet Store project'
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: [process.env.SWAGGER_SCHEME || 'http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);