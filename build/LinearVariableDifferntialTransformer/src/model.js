LVDT.model = (function() {
	
	var model = Backbone.Model.extend({
				 initialize: function() {
					  this.bind('error', function( model, error ) {
					  // console.error(error);
					  });
				 },//initialize
				 
				 defaults: {
					  'turns': 1000,
					  'supplyVoltage': 7,
					  'supplyFrequency': 50,
					  'outputVoltsRMS2':80
				 },//defaults
	});			
	
	return {
		model : model
	}
})();
