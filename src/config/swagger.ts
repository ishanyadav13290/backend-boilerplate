import swaggerJSDoc, { Options } from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Backend Boilerplate API",
    version: "1.0.0",
    description: "API documentation for the backend boilerplate",
  },
  servers: [
    { url: "/", description: "Current server" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options: Options = {
  swaggerDefinition,
  apis: [
    "src/app.ts",
    "src/routes/**/*.ts",
    "src/controllers/**/*.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);


