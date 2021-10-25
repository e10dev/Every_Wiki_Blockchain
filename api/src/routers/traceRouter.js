import express from "express";
import { writeBlock,
         readBlock,
         updateTitle,
         updateArticle,
         deleteBlock } from "../controllers/blockchain/traceController.js";

import routes from "../routes.js";

const traceRouter = express.Router();

/**
 * @swagger
 * path:
 *  /block/writeBlock:
 *    post:
 *      summury: write contents to wiki
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikidata'
 *      responses:
 *          "200":
 *              description: write contents to wiki
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikidata'
 */
 traceRouter.post(routes.writeBlock, writeBlock);

/**
 * @swagger
 * path:
 *  /block/readBlock:
 *    get:
 *      summury: readBlock wiki contents
 *      tags: [BlockChain API Service]
 *      parameters:
 *          - name: articleId
 *            in: query
 *            required: true
 *            description: user id pk
 *            schema:
 *                  type: integer
 *      responses:
 *          "200":
 *              description: readBlock wiki contents
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikidata'
 */
 traceRouter.get(routes.readBlock, readBlock);

/**
 * @swagger
 * path:
 *  /block/updateTitle:
 *    put:
 *      summury: update contents to wiki
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikidata'
 *      responses:
 *          "200":
 *              description: update contents to wiki
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikidata'
 */
 traceRouter.put(routes.updateTitle, updateTitle);

/**
 * @swagger
 * path:
 *  /block/updateArticle:
 *    put:
 *      summury: update contents to wiki
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikidata'
 *      responses:
 *          "200":
 *              description: update contents to wiki
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikidata'
 */
 traceRouter.put(routes.updateArticle, updateArticle);

/**
 * @swagger
 * path:
 *  /block/deleteBlock:
 *    delete:
 *      summury: delete wiki contents
 *      tags: [BlockChain API Service]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wikidata'
 *      responses:
 *          "200":
 *              description: delete wiki contents
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/wikidata'
 */
 traceRouter.delete(routes.deleteBlock, deleteBlock);


export default traceRouter;