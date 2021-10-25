import express from "express";
import { writebody,
         readbody,
         updatebody,
         deletebody } from "../controllers/blockchain/traceController.js";

import routes from "../routes.js";

const traceRouter = express.Router();

/**
 * @swagger
 * path:
 *  /block/writebody:
 *    post:
 *      summury: write contents to wiki
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikibody'
 *      responses:
 *          "200":
 *              description: write contents to wiki
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikibody'
 */
 traceRouter.post(routes.writebody, writebody);

/**
 * @swagger
 * path:
 *  /block/readbody:
 *    get:
 *      summury: readbody wiki contents
 *      tags: [BlockChain API Service]
 *      parameters:
 *          - name: user_id
 *            in: query
 *            required: true
 *            description: user id pk
 *            schema:
 *                  type: integer
 *      responses:
 *          "200":
 *              description: readbody wiki contents
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikibody'
 */
 traceRouter.get(routes.readbody, readbody);

/**
 * @swagger
 * path:
 *  /block/updatebody:
 *    put:
 *      summury: update contents to wiki
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikibody'
 *      responses:
 *          "200":
 *              description: update contents to wiki
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikibody'
 */
 traceRouter.put(routes.updatebody, updatebody);

/**
 * @swagger
 * path:
 *  /block/deletebody:
 *    delete:
 *      summury: delete wiki contents
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikibody'
 *      responses:
 *          "200":
 *              description: delete wiki contents
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikibody'
 */
 traceRouter.delete(routes.deletebody, deletebody);


export default traceRouter;