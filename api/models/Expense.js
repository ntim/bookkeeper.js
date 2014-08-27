/**
 * Expense.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        when: {
            type: 'datetime',
            defaultsTo: function() {
                return new Date();
            }
        },
        price: {
            type: 'float',
            defaultsTo: 0
        },
        person: {
            model: 'person',
            required: true
        }
    }
};
