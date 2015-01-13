RTD.collection = (function() {
	var staticCollection = Backbone.Collection.extend({
		initialize: function() {
					  //console.log('initialize collection');
					
				 },//initialize
				 
		model: RTD.model.staticModel
	});
	
	var dynamicCollection = Backbone.Collection.extend({
		initialize: function() {
					 // console.log('initialize collection');
					
				 },//initialize
			
		model: RTD.model.dynamicModel
	});
	
	return{
		staticCollection : staticCollection,
		dynamicCollection : dynamicCollection
	}
})();
