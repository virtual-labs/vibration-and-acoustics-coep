CONDUCTIVITY.collection = (function() {
	var measurementCollection  = Backbone.Collection.extend({
		model : CONDUCTIVITY.model.measurementModel,
		
		getModel : function(id) {
			return this;
		}
	});
	
	var temperatureCollection  = Backbone.Collection.extend({
		model : CONDUCTIVITY.model.temperatureModel,
		
		getModel : function(id) {
			return this;
		}
	});
	
	return{
		measurementCollection : measurementCollection,
		temperatureCollection : temperatureCollection
	}
})();