/**
 * @swagger
 *  components:
 *      schemas:
 *          wikibody:
 *              type: object
 *              required:
 *                  - name, id, text
 *              properties:
 *                  name:
 *                      type: string
 *                      default: ""
 *                  id:
 *                      type: string
 *                      default: ""
 *                  text:
 *                      type: string
 *                      default: ""
 */

 class wikibody {
    constructor(name, id, date) {
        this.name         = name;
        this.id           = id;
        this.date         = date;
    }
}

export default wikibody;