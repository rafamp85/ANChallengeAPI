const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Not exists a Token'
        });
    }

    try {

        const { id } = jwt.verify( token, process.env.JWT_SECRET );
        req.id = id;

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