var express = require('express');
var router = express.Router();
const { registerUser } = require('./validate');
const {
  createUser,
  login,
  forgotPassword,
  resetpassword,
  logout,
} = require('./controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *         - salt
 *         - accessTocken
 *       properties:
 *         firstName:
 *           type: string
 *           description: Full Name
 *         email:
 *           type: string
 *           description: The Email
 *         password:
 *           type: string
 *           description: Password
 *         salt:
 *           type: string
 *           description: hashed salt
 *         accessTocken:
 *           type: string
 *           description: Access Token
 *       example:
 *         firstName: Bincy Jacob
 *         email: aa@gmail.com
 *         password: aa
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication management api
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 * /auth/login:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The login user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error

 */

router.route('/signup').post(registerUser, createUser);
router.route('/login').post(login);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:accessToken').post(resetpassword);
router.route('/logout').post(logout);

// router.post('/signup', createUser);
// router.post('/login', login);

module.exports = router;
