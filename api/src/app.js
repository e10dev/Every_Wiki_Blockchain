import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import traceRouter from "./routers/traceRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import options from "./swagger.js";
import fs  from "fs";
import dotenv from "dotenv";

dotenv.config();
const envConfig = fs.existsSync('.env.local') && dotenv.parse(fs.readFileSync('.env.local'));
if (envConfig){
  for (let k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

const app = express();
const specs = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use(routes.home, traceRouter);
app.use(routes.home, swaggerUi.serve, swaggerUi.setup(specs, { explorer: true}));

export default app;
