const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'API for managing users and habits.',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/*.js']; // Todas las rutas

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./server');
});
