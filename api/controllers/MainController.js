/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		Person.find().populate('expenses').exec(function foundPersons(err, persons) {
		      if (err) return next(err);
		      
		      res.view({
		        persons: persons
		      });
		 });
	}
};
