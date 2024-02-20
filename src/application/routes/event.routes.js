import {verifyToken} from '../config/jwtCheck'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/event.controller')


/**
 * @swagger
 * /api/v1/event/create:
 *  post:
 *      sumary : create a new event
 *      tags : [Event]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          201:
 *              description : new event created!
 *          400:
 *              description: error to create event
 *      security:
 *	        - jwt: []
 */
router.post('/create',[verifyToken],controller.addEvent)



/**
 * @swagger
 * /api/v1/event/create/massive:
 *  post:
 *      sumary : create massive events
 *      tags : [Event]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                 schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          201:
 *              description : massive events created!
 *          400:
 *              description: error to create events
 *      security:
 *	        - jwt: []
 */
 router.post('/create/massive',[verifyToken],controller.addEventMassive)


/**
 * @swagger
 * /api/v1/event/all:
 *  get:
 *      sumary : get events
 *      tags : [Event]
 *      responses:
 *          201:
 *              description : ok
 *          400:
 *              description: evenst not found
 *      security:
 *	        - jwt: []
 */
router.get('/all',[verifyToken], controller.getAllEvents)

/**
 * @swagger
 * /api/v1/event/search/{id}:
 *  get:
 *      sumary : search event by id
 *      tags : [Event]
 *      parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : user id
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
 *      sumary : edit Event
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
 *                      $ref: '#/components/schemas/EventLoad'
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
 * /api/v1/event/update/load/massive:
 *  put:
 *      sumary : edit massive event
 *      tags : [Event]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                 schema:
 *                      $ref: '#/components/schemas/EventUpdate'
 *      responses:
 *          201:
 *              description : ok
 *          400:
 *              description: error to edit 
 *      security:
 *	        - jwt: []
 */
 router.put('/update/load/massive',[verifyToken],controller.updateEventMassive)


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
 router.delete('/delete/:id',[verifyToken],controller.deleteById)



module.exports = router