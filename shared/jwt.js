const jwt = require('jsonwebtoken');


const generateJWT = ( id, role, name, englishLevel, techKnowledge, email ) => {

    return new Promise( (resolve, reject ) => {

        const payload = {
            id,
            role,
            name,
            englishLevel,
            techKnowledge,
            email
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
