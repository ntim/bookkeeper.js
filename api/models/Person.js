/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');
function hashPassword(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        values.password = hash;
        next();
    });
}

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        expenses: {
            collection: 'expense',
            via: 'person'
        },
        saldo: function() {
            var s = 0.0;
            this.expenses.forEach(function(e) {
                s += e.price;
            });
            return s;
        }
    },
    beforeCreate: function(values, next) {
        hashPassword(values, next);
    },
    beforeUpdate: function(values, next) {
        if (values.password) {
            return hashPassword(values, next);
        }
        next();
    }

};
