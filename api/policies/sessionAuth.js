/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if (req.session.authenticated) {
        return next();
    }
    Person.count().exec(function(err, count) {
        if (err) {
            return res.redirect('/session/new');
        }
        // If no people present, then allow access.
        if (count == 0) {
            return next();
        }
        req.session.flash = {
            err: {
                error: "notPermitted", 
                summary: "You must sign in to perform this action."
            }
        };
        // Person is not allowed
        req.session.redirect = req.url;
        return res.redirect('/session/new');
    });
};
