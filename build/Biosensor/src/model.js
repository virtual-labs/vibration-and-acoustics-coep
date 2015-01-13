BIOSENSOR.model = (function() {
	
	var model = Backbone.Model.extend({
			
			defaults : {
				'rpm' : '',
				'age' : '',
				'error' : ''
			}
		});
	
	return  {
		model : model
	}
	
})();
