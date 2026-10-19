import swaggerJsdoc from 'swagger-jsdoc';

export const openApiSpecification = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product REST API',
      version: '1.0.0',
      description: 'CRUD API for managing products.'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./src/routes/*.ts']
});