module.exports = {
    components: {
        schemas: {

            Login: {
                type: "object",
                properties: {
                    email: { type: "string" },
                    password: { type: "string" }
                }
            },
            User: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    phone_number: { type: "number" },
                    address: { type: "string" },
                    id_rol: { type: "number" },
                    id_city: { type: "number" },
                }
            },

            
        },
        securitySchemes: {
            jwt: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
            },
        }
    }
};