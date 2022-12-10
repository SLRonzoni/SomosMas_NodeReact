/**
 * @swagger
 * components:
 *   schemas :
 *     Messages:
 *       type: object
 *       properties:
 *          name:
 *              type: string
 *              description : the message sender
 *          phone:
 *              type: string
 *              description : the sender phone
 *          email:
 *              type: string
 *              description : the sender email
 *          message:
 *              type: string
 *              description : the message 
 *          updatedAt: 
 *              type: date
 *              description: the category updated date
 *          createdAt: 
 *              type: date
 *              description: the category created date
 *       required:
 *          - name
 *          - email
 *          - message
 *       example:
 *          name: Marcelo Benitez
 *          phone: 11-1234-1234
 *          email: marcelobenitez@yahoo.com
 *          message: hola, quisiera info sobre la ong. Muchas gracias y saludos
 *          updatedAt: 2022-07-05T03:02:09.285Z
 *          createdAt: 2022-07-05T03:02:09.285Z
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List all messages with pagination
 *     tags: [Messages]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *          required: false
 *          description: Page for pagination
 *     responses:
 *       '200':
 *         description: return all messages
 *       '500':
 *         descripcion: server error
 */

/**
 * @swagger
 * /api/messages/{id} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List one message by id
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the message you want to see 
 *     responses:
 *       '200':
 *         description: return message
 *       '404':
 *         descripcion: the message does not exists
 *       '500':
 *         descripcion: server error
 */
/**
 * @swagger
 * /api/messages/{email} :
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: List message by email
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: email
 *          schema:
 *              type: integer
 *          required: true
 *          description: email of the message you want to see 
 *     responses:
 *       '200':
 *         description: return message
 *       '404':
 *         descripcion: the email does not exists
 *       '500':
 *         descripcion: server error
 */
/**
/**
 * @swagger
 * /api/messages/del/{id} :
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Remove one message by id
 *     tags: [Messages]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *          description: id of the message to be removed
 *     responses:
 *       '200':
 *         description: message {id} deleted
 *       '404':
 *         descripcion: the message does not exists
 *       '500':
 *         descripcion: server error
 */