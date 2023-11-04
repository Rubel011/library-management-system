const swaggerJSDoc = require('swagger-jsdoc');
require("dotenv").config()
const BACKEND_DEPLOYED_URL=process.env.BACKEND_DEPLOYED_URL||"http://localhost:8080/"
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Library Management System',
            version: '1.0.0',
            description: 'Documentation for library management',
        },
        servers: [
            {
                url:BACKEND_DEPLOYED_URL,
            }
        ]
    },
    // Provide the path to your API routes files
    apis: ['./docs/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;