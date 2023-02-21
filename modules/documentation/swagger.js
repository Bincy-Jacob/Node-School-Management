const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    schemes: ['http', 'https'],
    info: {
      title: 'School Management',
      version: '1.0.1',
      description: 'My API description',
      termsOfService: 'http://localhost:5000',
      contact: {
        name: 'Binzer',
        email: 'bincy@spericorn.com',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    // servers: [
    //   {
    //     url: 'http',
    //   },
    //   {
    //     url: 'https',
    //   },
    // ],
  },

  apis: [
    path.resolve(`${__dirname}/../../api/course/course_management/index.js`),
    path.resolve(`${__dirname}/../../api/swaggerDemo/index.js`),
    path.resolve(`${__dirname}/../../api/auth/index.js`),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
