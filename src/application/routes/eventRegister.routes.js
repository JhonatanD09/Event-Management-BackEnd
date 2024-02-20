import {verifyToken} from '../config/jwtCheck'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/eventRegister.controller')

/**
 * @swagger
 * /api/v1/register/:
 *  post:
 *      sumary : register event
 *      tags : [Register]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *      responses:
 *          201:
 *              description : new register created!
 *          400:
 *              description: error to create register
 *      security:
 *	        - jwt: []
 */
router.post('/',[verifyToken], controller.registerEvent)

/**
 * @swagger
 * /api/v1/register/:
 *  delete:
 *      sumary : Delete event register
 *      tags : [Register]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *      responses:
 *          201:
 *              description : Delete event register
 *          400:
 *              description: error to delete event register
 *      security:
 *	        - jwt: []
 */
 router.delete('/',[verifyToken], controller.cancelRegisterEvent)

 /**
 * @swagger
 * /api/v1/event/searchByUser/{id}:
 *  get:
 *      sumary : search events by user
 *      tags : [Register]
 *      parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : user id
 *      responses:
 *          201:
 *              description : ok
 *          400:
 *              description: error to search events
 *      security:
 *	        - jwt: []
 */
 router.get('/searchByUser/:id',[verifyToken], controller.getEventsByUser)

  /**
 * @swagger
 * /api/v1/event/searchByEvent/{id}:
 *  get:
 *      sumary : search events by user
 *      tags : [Register]
 *      parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : event id
 *      responses:
 *          201:
 *              description : search events by user
 *          400:
 *              description: error to search events by user
 *      security:
 *	        - jwt: []
 */
 router.get('/searchByEvent/:id',[verifyToken], controller.getUsersByEvent)

   /**
 * @swagger
 * /api/v1/event/usersByDay/{id}:
 *  get:
 *      sumary : search user by days in events
 *      tags : [Register]
 *      responses:
 *          201:
 *              description : search user by days in events
 *          400:
 *              description: error to search user by days in events
 *      security:
 *	        - jwt: []
 */
 router.get('/usersByDay',[verifyToken], controller.reportUsersByDay)

module.exports = router