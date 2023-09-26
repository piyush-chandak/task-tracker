/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task Apis
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get list of all tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: number
 *         description: Page Size
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                tasks:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Task'
 *                total_count:
 *                  type: number
 *
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 * 
 *   post:
 *     summary: Create new tasks
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: "abcd"
 *               description: "fake description"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update specific task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Task Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               title: "abcd"
 *               description: "fake description"
 *               status: "completed"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 * 
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "404":
 *         $ref: '#/components/responses/NotFoundError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /tasks/meterics:
 *   get:
 *     summary: Get Meterics or Summary of open, inprocess, completed task
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *         description: Starting date of timeline
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: number
 *         description: End date of timeline
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "Septemper 2023"
 *                   metrics:
 *                     type: object
 *                     properties:
 *                       open_tasks:
 *                         type: integer
 *                         example: 0
 *                       inprogress_tasks:
 *                         type: integer
 *                         example: 0
 *                       completed_tasks:
 *                         type: integer
 *                         example: 0
 *
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */ 