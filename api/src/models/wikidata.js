/**
 * @swagger
 *  components:
 *      schemas:
 *          wikidata:
 *              type: object
 *              required:
 *                  - wiki
 *                  - articleId
 *                  - username
 *                  - title
 *                  - wikitext
 *              properties:
 *                  wiki:
 *                      type: string
 *                      default: "wiki"
 *                  articleId:
 *                      type: integer
 *                      default: ""
 *                  username:
 *                      type: string
 *                      default: ""
 *                  title:
 *                      type: string
 *                      default: ""
 *                  wikitext:
 *                      type: string
 *                      default: ""
 */

 class wikidata {
    constructor(articleId, username, title, wikitext) {
        this.articleId        = articleId;
        this.username         = username;
        this.title            = title;
        this.wikitext         = wikitext;
    }
}

export default wikidata;