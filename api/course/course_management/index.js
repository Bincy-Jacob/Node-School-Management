var express = require('express');
var router = express.Router();

const {
  getCourses,
  postCourse,
  patchCourse,
  removeCourse,
  getAddForm,
  getCoursesById,
} = require('./controller');

/**
 * @swagger
 *  /course:
 *      get:
 *          tags:
 *              -   Course-management
 *          description: Course Add
 *          parameters:
 *              -   in: query
 *                  name : id
 *                  description: id of course not required.
 *                  type: string
 *
 *
 *          responses:
 *              200 :
 *                  description: fetched all data
 *
 */
router.get('/', getCourses);

/**
 * @swagger
 *  /course:
 *      post:
 *          tags:
 *              -   Course-management
 *          description: Course
 *          requestBody:
 *          content:
 *           application/json:
 *
 *          parameters:
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          name:
 *                              type: string
 *                              required: true,
 *                              example: "Swagger"
 *                          duration:
 *                              type: string,
 *                              required: true,
 *                              example: "10 hrs"
 *                          start_date:
 *                              type: string
 *                              format: date
 *                              required: true,
 *                              example: "2023-01-01"
 *                          end_date:
 *                              type: string,
 *                              format: date
 *                              required: true,
 *                              example: "2023-01-01"
 *
 *          responses:
 *              200 :
 *                  description: posted successfull
 *
 *
 */

router.post('/', postCourse);

/**
 * @swagger
 *  /course/{id}:
 *      get:
 *          tags:
 *              -   Course-management
 *          description: Course Add
 *          parameters:
 *              -   in: path
 *                  name : id
 *                  required: true
 *                  description: id of course not required.
 *                  type: string
 *                  schema:
 *                     type: string
 *                     minimum: 1
 *
 *
 *          responses:
 *              200 :
 *                  description: fetched all data
 *              400 :
 *                  description: The specified user ID is invalid (not a number).
 *              404 :
 *                  description: A user with the specified ID was not found.
 *              default:
 *                  description: Unexpected error
 *
 */
router.get('/:id', getCoursesById);

router.put('/:id', patchCourse);
router.delete('/:id', removeCourse);
router.get('/add/', getAddForm);

module.exports = router;
