CAPACITANCE.model = (function() {
	var capacitanceModel  = Backbone.Model.extend({
		
		initialize : function() {
				this.bind("change:service", function() {
					this.changeServiceColor()
				});
			},
			
		defaults:{
			'h': 0,
			'r1':'',
			'r2':2.5,
			'service':'',
			'color':'',
			'capArray':[],
			'curArray':[]
			
		},
		idAttribute: "key",
		
		changeServiceColor : function(){
			var s = this.get('service');
			switch(s){
				case 1.5:
				 this.set({'color' : "url('assert/images/Coffee-Bean.png')"});
				 break;
				case 3.6:
				 this.set({'color' : "url('assert/images/Mustard_Seed.png')"});
				 break;
				case 80:
				 this.set({'color' : "#7EDFFF"});
				 break;
				case 5:
				 this.set({'color' : "#C9FF94"});
				 break;
				case 2.3:
				 this.set({'color' : "#DEB887"});
				 break;
			}
		}
	});
	
	return {
		capacitanceModel : capacitanceModel
	}
})();
