STRAIN.collection = (function() {
	var measurementCollection = Backbone.Collection.extend({
		initialize: function() {
				 },//initialize
		model: STRAIN.model.measurementLevelModel
	});
	return{
		measurementCollection : measurementCollection
	}
})();
