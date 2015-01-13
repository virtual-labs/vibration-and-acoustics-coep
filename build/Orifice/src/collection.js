ORIFICE.collection = (function() {
	var measurementCollection = Backbone.Collection.extend({
		model:ORIFICE.model.measurementModel,
	});
	
	var serviceCollection = Backbone.Collection.extend({
		model:ORIFICE.model.serviceModel,
	});
	
	var tappingCollection = Backbone.Collection.extend({
		model:ORIFICE.model.tappingModel,
	});
	
	var temperatureCollection = Backbone.Collection.extend({
		model:ORIFICE.model.temperatureModel,
	});
	
	return {
		measurementCollection : measurementCollection,
		serviceCollection : serviceCollection,
		tappingCollection : tappingCollection,
		temperatureCollection :temperatureCollection
	}
})();