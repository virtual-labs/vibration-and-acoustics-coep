PH.collection = (function() {
	var measurementCollection = Backbone.Collection.extend({
		model : PH.model.measurementModel,

		getModel : function(id) {
			return this;
		}
	});


	return {
		measurementCollection : measurementCollection
	}
})();
