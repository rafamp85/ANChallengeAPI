const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../shared/jwt');


const getUsers = async(req, res) => {

    const users = await User.find({}, 'name email role');

    res.json({
        ok: true,
        users,
        id: req.id
    });
}

const createUser = async( req, res = response ) => {

    const { password, email } = req.body;

    try {
        // Validation exists Email
        const emailExists = await User.findOne({email});

        if( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'This email account already exists'
            });
        }

        // Request the Body
        const user = new User( req.body );

        // Cipher password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Save User
        await user.save();

        // Create Token
        const token = await generateJWT( user.id, user.role );
    
        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Creating new User'
        });
    }
}

const updateUser = async( req, res = response ) => {

    const id = req.params.id;

    try {

        const dbUser = await User.findById( id );

        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Not user found'
            });
        }

        const {password, role, email, ...fields} = req.body;

        if ( dbUser.email !== email ) {
            const emailExists = await User.findOne({email});
            if ( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'This email account already exists'
                });
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate( id, fields, { new: true } );
        
        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Updating User'
        });
    }
};

const deleteUser = async(req, res = response ) => {

    const id = req.params.id;

    try {
        const dbUser = await User.findById( id );

        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Not user found'
            });
        }

        await User.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'User has been Deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Deleting User'
        });
    }
}


module.exports = { 
    getUsers,
    createUser,
    updateUser,
    deleteUser
};