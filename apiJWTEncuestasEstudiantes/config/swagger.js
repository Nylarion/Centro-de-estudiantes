const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Encuestas Estudiantes',
            version: '1.0.0',
            description: 'API para la gestión de encuestas y votaciones del Centro de Estudiantes',
            contact: {
                name: 'Soporte',
                email: 'bpalma2025@alu.uct.cl'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js'] // Archivos donde buscará la documentación
};

const specs = swaggerJsdoc(options);
module.exports = specs;
