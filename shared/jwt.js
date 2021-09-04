const jwt = require('jsonwebtoken');


const generateJWT = ( id, role ) => {

    return new Promise( (resolve, reject ) => {

        const payload = {
            id,
            role
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
            
            if( err ) {
                console.log(err);
                reject('Error creating JWT');
            } else {
                resolve( token );
            }

        });

    });
};

module.exports = { generateJWT }