import {verifyToken} from '../config/jwtCheck'
const express = require('express')
const router = express.Router()
const controller = require('../../application/controllers/user.controller')

/**
 * @swagger
 * /api/v1/user/create:
 *  post:
 *      sumary : create a new user
 *      tags : [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description : new user created!
 *          400:
 *              description: error to create user
 *      security:
 *	        - jwt: []
 */
router.post('/create',[verifyToken], controller.create)

/**
 * @swagger
 * /api/v1/user/search/{id}:
 *  get:
 *      sumary : User administration
 *      tags : [User]   
*      parameters:
 *          - in : query
 *            name: params
 *            schema:
 *              type: object
 *              additionalProperties: true
 *            description : params to search
 *      responses:
 *          200:
 *              description: get all users!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type : array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400: 
 *              description: Error to get users
 *      security:
 *	        - jwt: []
 */
router.get('/search/:id',[verifyToken], controller.searchById)

/**
 * @swagger
 * /api/v1/user/update/{id}:
 *  put:
 *      sumary : editUser
 *      tags : [User]
 *      parameters:
 *          - in : paths'
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description : user edit!
 *          400:
 *              description: user not edit
 *      security:
 *	        - jwt: []
 */
router.put('/update/:id',[verifyToken], controller.updateUser)

/**
 * @swagger
 * /api/v1/user/delete:
 *  delete:
 *      sumary : User administration
 *      tags : [User]   
 *      parameters:
 *          - in : path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description : user id
 *      responses:
 *          200:
 *              description : user eliminated
 *          400:
 *              description : error to delete user
 *      security:
 *	        - jwt: []
 */
router.delete('/delete/:id',[verifyToken], controller.deleteUserById)

router.get('/getNearbyLocations/:id',[verifyToken], controller.getNearbyLocations)

module.exports = router
