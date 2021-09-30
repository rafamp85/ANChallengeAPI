
require('dotenv').config();

const express = require('express');
const cors = require('cors');

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const { dbConnection } = require('./database/config');

// Create the server
const app = express();

// Public Dir
app.use( express.static('public') );

// Configure CORS
app.use( cors() );
// Parse Body
app.use( express.json() );

// Database
dbConnection();

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/users', require('./routes/users') );
app.use( '/api/accounts', require('./routes/accounts') );


app.listen( process.env.PORT, () => {
    console.log('Server running in port', 5200);
});
