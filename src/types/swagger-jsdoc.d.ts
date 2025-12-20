declare module "swagger-jsdoc" {
  export interface Options {
    swaggerDefinition: any;
    apis: string[];
  }
  function swaggerJSDoc(options: Options): any;
  export default swaggerJSDoc;
}


