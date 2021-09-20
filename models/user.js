const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    abilities: {
      englishLevel: {
        type: String,
        required: true,
        default: '0'
      },
      techKnowledge: {
        type: Array,
        required: true,
      }
    }
});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.id = _id;
    return object;
});

module.exports = model( 'User', UserSchema );
