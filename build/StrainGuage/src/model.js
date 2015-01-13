//data storage
STRAIN.model = (function() {
	var measurementLevelModel = Backbone.Model.extend({
			
		initialize : function(){
			this.setOption();
		} ,
		
		defaults: {
				'material':'',
				'inputVoltage':'',
				'resistance':'',
				'configVal':[],
				'configuration':'',
				'gaugeFactor':'',
				'weight':'',
				'graph1': []
		},
		
		idAttribute: "key",
		
		setOption : function(){
			var a = ['Quarter Bridge', 'Half Bridge Adjacent Arms', 'Half Bridge Opposite Arms', 'Full Bridge'];
			this.set({
				configVal : a
			})
		}//setOption
	});
	
	var changePosModel = Backbone.Model.extend({
		defaults: {
			'graph2': []
		},
	});
	
	var temperatureModel = Backbone.Model.extend({
		defaults: {
			'temp' : '',
			'betas' : 0.0000117,
			'graph3': []
		},
	});
	
	return{
		measurementLevelModel : measurementLevelModel,
		changePosModel : changePosModel,
		temperatureModel : temperatureModel
	}
})();
