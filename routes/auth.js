/**
 * Route: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { login, validateToken } = require('../controllers/auth');


const router = Router();

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
);

router.get('/renew', validateJWT, validateToken );

module.exports = router;
