const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const components = require('./swagger.components.comfig')

const swaggerSpec = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Event Management API',
            version: '1.0.0',
        },
        servers: [{
            url: `http://localhost:3000`
        }],
        ...components,
        security: [{
            jwt: []
        }],

    },
    apis: [`${path.join(__dirname, '/../routes/*.js')}`],
}

export const SWAGGER_SERVE = swaggerUi.serve;

export const SWAGGER_SETUP = swaggerUi.setup(swaggerJsDoc(swaggerSpec));