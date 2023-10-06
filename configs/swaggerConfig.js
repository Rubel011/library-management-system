const swaggerJSDoc = require('swagger-jsdoc');

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
                url: "http://localhost:8080",
            }
        ]
    },
    // Provide the path to your API routes files
    apis: ['./docs/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;