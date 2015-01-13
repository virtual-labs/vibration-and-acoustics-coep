
//data storage
RTD.model = (function() {
	var staticModel = Backbone.Model.extend({
		
		defaults: {
				'material':'' ,
				'R0':''	,
				'staticArray':[]
		},
		
		idAttribute: "key"
		
		/*setMaterial :function(material){
			this.set({ material : material });
		},
		
		getMaterial : function(){
			return (this.attributes.material);
		},*/
	});
	
	var dynamicModel = Backbone.Model.extend({
		
		defaults: {
				'bare':[] ,
				'withSheath':[]	,
				'thermowell':[]
		},
		
		idAttribute: "key"
	})
	
	return{
		staticModel : staticModel,
		dynamicModel : dynamicModel
	}
})();
