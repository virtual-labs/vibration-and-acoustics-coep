CAPACITANCE.collection = (function() {
	var capacitanceCollection  = Backbone.Collection.extend({
		model : CAPACITANCE.model.capacitanceModel,
		
		getModel : function(id) {
			return this;
		}
	});
	
	return{
		capacitanceCollection : capacitanceCollection
	}
})();