const { Schema, model } = require('mongoose');

const AccountSchema = Schema({
    accountName: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true,
        unique: true
    },
    accountManager: {
        type: String,
        required: true
    },
    consult: {
        type: String,
        required: true,
    }
});

AccountSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
});

module.exports = model( 'Account', AccountSchema );
