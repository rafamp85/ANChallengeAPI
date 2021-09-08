const jwt = require('jsonwebtoken');
const { response } = require('express');

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Not exists a Token'
        });
    }

    try {

        const { id, name, role } = jwt.verify( token, process.env.JWT_SECRET );
        req.id = id;
        req.name = name;
        req.role = role;

        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }
}

module.exports = {
    validateJWT
}
