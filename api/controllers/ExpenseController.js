/**
 * ExpenseController
 *
 * @description :: Server-side logic for managing Expenses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    'new': function(req, res) {
        res.view();
    },

    create: function(req, res) {

        var paramObj = {
            name: req.param('name'),
            price: req.param('price'),
            person: req.session.person
        }

        // Create a User with the params sent from 
        // the sign-up form --> new.ejs
        Expense.create(paramObj, function expenseCreated(err, expense) {

            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/expense/new');
            }

            // res.json(expense);
            res.redirect('/expense/show/' + expense.id);

        });
    },

    show: function(req, res, next) {
        Expense.findOne(req.param('id')).populate('person').exec(function foundExpense(err, expense) {
            if (err) return next(err);
            if (!expense) return next();

            // res.json(expense);
            res.view({
                expense: expense
            });
        });
    },

    index: function(req, res, next) {
        Expense.find().populate('person').exec(function foundExpenses(err, expenses) {
            if (err) return next(err);

            res.view({
                expenses: expenses
            });
        });
    },

    edit: function(req, res, next) {

        Expense.findOne(req.param('id'), function foundExpense(err, expense) {
            if (err) return next(err);
            if (!expense) return next('expense doesn\'t exist.');

            res.view({
                expense: expense
            });
        });
    },

    update: function(req, res, next) {

        var paramObj = {

        }

        Expense.update(req.param('id'), paramObj, function expenseUpdated(err) {
            if (err) {
                console.log(err);

                req.session.flash = {
                    err: err
                }

                return res.redirect('/expense/edit/' + req.param('id'));
            }

            res.redirect('/expense/show/' + req.param('id'));
        });
    },

    destroy: function(req, res, next) {

        Expense.findOne(req.param('id'), function foundExpense(err, expense) {
            if (err) return next(err);

            if (!expense) return next('Expense doesn\'t exist.');

            Expense.destroy(req.param('id'), function expenseDestroyed(err) {
                if (err) return next(err);
            });

            res.redirect('/expense');

        });
    }


};
