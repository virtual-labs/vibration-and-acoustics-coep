THERMOCOUPLE.collection = (function() {
	var staticCollection = Backbone.Collection.extend({
		initialize: function() {
					 // console.log('initialize collection');
					
				 },//initialize
				 
		model: THERMOCOUPLE.model.staticModel
	});
	
	var dynamicCollection = Backbone.Collection.extend({
		initialize: function() {
					 // console.log('initialize collection');
					
				 },//initialize
			
		model: THERMOCOUPLE.model.dynamicModel
	});
	
	return{
		staticCollection : staticCollection,
		dynamicCollection : dynamicCollection
	}
})();
