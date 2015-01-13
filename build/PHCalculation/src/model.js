PH.model = (function() {
	var temp = [];
	var calibrationModel = Backbone.Model.extend({
		
		initialize : function(){
			this.bind("change:pH", function() {
			this.changepH();
			});
		},
		defaults : {
			'pH' : '',
			'constants':{},
			'resist':[],
			'graphData':[]
		},
		idAttribute : "id",
		
		changepH : function(){
			var ph = this.get('pH');
			switch(ph) {
				case 4:
				 this.set({
				 	constants : {
				 		value:4,
				 		E1:0,
				 		R:8.3144,
				 		T:298.15,
				 		F:96485,
				 		p:3
				 	}
				 });
				 temp[0] = 0;
				 temp[1] = 4;
				 temp[2] = 7;
				 temp[3] = 14;
				 this.set({
				 	resist:temp
				 });
				
			     break;
			     
			    case 9.2: 
			     this.set({
				 	constants : {
				 		value:9.2,
				 		E1:0,
				 		R:8.3144,
				 		T:298.15,
				 		F:96485,
				 		p:-2.2
				 	}
				 });
				 temp[0] = 0;
				 temp[1] = 7;
				 temp[2] = 9.2;
				 temp[3] = 14;
				 this.set({
				 	resist:temp
				 })	;
				
				break;	
			}
		}
	});

	var measurementModel = Backbone.Model.extend({
		initialize : function(){
			this.bind("change:sample", function() {
			this.changeSample();
			});
		},
		defaults : {
			'sample':'',
			'ph':'',
			'ph1':'',
			'ans':''
		},
		idAttribute : "key",
		
		changeSample : function(){
			var s = this.get('sample');
			switch(s){
				case "Lemon Juice":
				 this.set({'ph' : 2.2});
				 this.set({'ph1' : 4.8});
				 PH.diagram.diag.color1.attr({fill:"#FFFACD",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#FFFACD",stroke:"transparent"});
				break;
				case "Fruit Vinegar":
				 this.set({'ph' : 3.2});
				 this.set({'ph1' : 3.8});
				 PH.diagram.diag.color1.attr({fill:"#C14E4E",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#C14E4E",stroke:"transparent"});
				break;
				case "Orange Juice":
				 this.set({'ph' : 3.7});
				 this.set({'ph1' : 3.3});
				 PH.diagram.diag.color1.attr({fill:"#FF6A33",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#FF6A33",stroke:"transparent"});
				break;
				case "Boric Acid":
				 this.set({'ph' : 5.0});
				 this.set({'ph1' : 2.0});
				 PH.diagram.diag.color1.attr({fill:"#FFE4B5",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#FFE4B5",stroke:"transparent"});
				break;
				case "Coffee":
				 this.set({'ph' : 5.0});
				 this.set({'ph1' : 2.0});
				 PH.diagram.diag.color1.attr({fill:"#7D3E11",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#7D3E11",stroke:"transparent"});
				break;
				case "Milk":
				 this.set({'ph' : 6.6});
				 this.set({'ph1' : 0.4});
				 PH.diagram.diag.color1.attr({fill:"#FFEBCD",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#FFEBCD",stroke:"transparent"});
				break;
				case "Distilled water":
				 this.set({'ph' :7.0});
				 this.set({'ph1' : 0});
				 PH.diagram.diag.color1.attr({fill:"#99E6FF",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#99E6FF",stroke:"transparent"});
				break;
				case "Sea Water":
				 this.set({'ph' : 8.0});
				 this.set({'ph1' : -1.0});
				 PH.diagram.diag.color1.attr({fill:"#8ACFE6",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#8ACFE6",stroke:"transparent"});
				break;
				case "Baking Soda":
				 this.set({'ph' : 9.0});
				 this.set({'ph1' : -2.0});
				 PH.diagram.diag.color1.attr({fill:"#FFDEAD",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#FFDEAD",stroke:"transparent"});
				break;
				case "Ammonia":
				 this.set({'ph' : 11.0});
				 this.set({'ph1' : -4.0});
				 PH.diagram.diag.color1.attr({fill:"#F5DEB3",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#F5DEB3",stroke:"transparent"});
				break;
				case "Bleach":
				 this.set({'ph' : 13.0});
				 this.set({'ph1' : -5.0});
				 PH.diagram.diag.color1.attr({fill:"#FFDEAD",stroke:"transparent"});
				 PH.diagram.diag.color2.attr({fill:"#FFDEAD",stroke:"transparent"});
				break; 
			}
		}
	});

	/*
	var temperatureModel = Backbone.Model.extend({
			defaults : {
	
			},
			idAttribute : "id",
		});*/
	

	return {
		calibrationModel : calibrationModel,
		measurementModel : measurementModel

	}
})();
