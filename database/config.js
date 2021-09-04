const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Online')

    } catch (error) {
        console.error(error);
        throw new Error( 'Error: Init the Operation Admin Database, read Logs' );
    }
};

module.exports = {
    dbConnection
};