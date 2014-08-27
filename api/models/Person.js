/**
 * Person.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

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
    beforeCreate: function(attrs, next) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(attrs.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                };

                attrs.password = hash;
                next();
            });
        });
    }

};
