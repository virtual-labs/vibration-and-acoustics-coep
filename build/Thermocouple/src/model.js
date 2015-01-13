//data storage
THERMOCOUPLE.model = (function() {
	var staticModel = Backbone.Model.extend({
		initialize: function() {
					 // console.log('initialize model');
					 // _.bindAll(this,'getMaterial','setMaterial')
				 },//initialize
				 
		defaults: {
				'thermoCoupleType':'',
				'refTemp':'',
				'staticGraphPts':[]
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
		initialize: function() {
					  //console.log('initialize model');
					 
				 },//initialize
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
