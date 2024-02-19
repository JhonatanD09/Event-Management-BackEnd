import {verifyToken} from '../config/jwtCheck'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/event.controller')

/**
 * @swagger
 * /api/v1/event/create:
 *  post:
 *      sumary : create a new user
 *      tags : [Event]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          201:
 *              description : new user created!
 *          400:
 *              description: error to create user
 *      security:
 *	        - jwt: []
 */
router.post('/create',[verifyToken], controller.addEvent)


/**
 * @swagger
 * /api/v1/event/all:
 *  get:
 *      sumary : create a new user
 *      tags : [Event]
 *      responses:
 *          201:
 *              description : new user created!
 *          400:
 *              description: error to create user
 *      security:
 *	        - jwt: []
 */
router.get('/all',[verifyToken], controller.getAllEvents)

/**
 * @swagger
 * /api/v1/event/search/{id}:
 *  get:
 *      sumary : create a new user
 *      tags : [Event]
 *      responses:
 *          201:
 *              description : new user created!
 *          400:
 *              description: error to create user
 *      security:
 *	        - jwt: []
 */
 router.get('/search/:id',[verifyToken], controller.getEventById)

 /**
 * @swagger
 * /api/v1/event/update/{id}:
 *  put:
 *      sumary : editEvent
 *      tags : [Event]
 *      parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          201:
 *              description : Event edit!
 *          400:
 *              description: Event not edit
 *      security:
 *	        - jwt: []
 */
 router.put('/update/:id',[verifyToken],controller.updateEvent)

 /**
 * @swagger
 * /api/v1/event/delete:
 *  delete:
 *      sumary : Event delete
 *      tags : [Event]   
 *      parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : event id
 *      responses:
 *          200:
 *              description : event eliminated
 *          400:
 *              description : event not found
 *      security:
 *	        - jwt: []
 */
 router.delete('delete/:id',[verifyToken],controller.deleteById)

module.exports = router