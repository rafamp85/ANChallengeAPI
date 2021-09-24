/**
 * Route: /api/users
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, getUsers );

router.get( '/:id', validateJWT, getUserById );

router.post( '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ],
    createUser
);

router.put( '/:id',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ],
    updateUser
);

router.delete( '/:id', validateJWT, deleteUser );


module.exports = router
