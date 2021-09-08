/**
 * Route: /api/accounts
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { getAccounts, createAccount, updateAccount, deleteAccount } = require('../controllers/accounts');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, getAccounts );

router.post( '/',
    [
        validateJWT,
        check('accountName', 'Name of the Account is required').not().isEmpty(),
        check('client', 'Client is required').not().isEmpty(),
        check('accountManager', 'Manager Account is required').not().isEmpty(),
        check('consult', 'Consult is required').not().isEmpty(),
        validateFields
    ],
    createAccount
);

router.put( '/:id',
    [
        validateJWT,
        check('accountName', 'Name of the Account is required').not().isEmpty(),
        check('client', 'Client is required').not().isEmpty(),
        check('accountManager', 'Manager Account is required').not().isEmpty(),
        check('consult', 'Consult is required').not().isEmpty(),
        validateFields
    ],
    updateAccount
);

router.delete( '/:id', validateJWT, deleteAccount );


module.exports = router
