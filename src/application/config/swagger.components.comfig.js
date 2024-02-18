module.exports = {
    components: {
        schemas: {

            Login: {
                type: "object",
                properties: {
                    userName: { type: "string" },
                    password: { type: "string" }
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