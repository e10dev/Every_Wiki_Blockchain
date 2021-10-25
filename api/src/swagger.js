const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "k2l2 wiki blockchain api",
            version: "0.1.0",
            description: "a Rest api using swagger and express.",
        },
    },
    apis: ["./src/models/*.js", "./src/routers/*.js"],
};

export default options;