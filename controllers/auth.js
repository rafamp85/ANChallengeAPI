const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../shared/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const dbUser = await User.findOne({ email });

        // Verify Email
        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password invalid'
            });
        }

        // Verify Password
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password invalid'
            });
        }

        // Create Token
        const token = await generateJWT( dbUser.id, dbUser.role );

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something is wrong with the Login'
        });
    }
}

module.exports = {
    login
}