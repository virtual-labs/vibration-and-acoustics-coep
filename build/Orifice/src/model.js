ORIFICE.model = (function() {
	
	var measurementModel = Backbone.Model.extend({
		/*initialize : function() {
				this.bind("change:d", function() {
					this.changeD()
				});
			},*/
		defaults : {
			'beta' : '',
			'd' : 25,
			'Q' :150,
			'a0' : 0.5961,
			'level':"l1",
			'config' : {
				densityvalue : 1000,
				meu : 0.001,
				l2 : 25.4
			},
			'graphdata':[]
		},
		idAttribute: "key"	
	});
	
	
	var serviceModel = Backbone.Model.extend({
		initialize : function() {
				this.bind("change:service", function() {
					this.changeService();
				});
			},
		defaults : {
			'service' : '',
			'Q' : 150,
			'a0' : 0.5961,
			'level':"l2",
			'config' : {},
			'graphdata':[]
		},
		
		idAttribute: "key"	,
		
		changeService : function(){
			var serv = this.get('service');
			switch(serv) {
						case "--Select--":
								this.set({
									config : {}
							});
						break;
						case "Dilute HCL" :
							this.set({
								config : {
									densityvalue : 1048,
									meu : 0.00116,
									l2 : 25.4
								}
								});
						break;
						case "Steam" :
							this.set({
								config : {
									densityvalue : 1.122,
									meu : 0.00001285,
									l2 : 25.4
								}
								});
						break;
						case "Air" :
							this.set({
								config : {
									densityvalue : 3.5346,
									meu : 1.837*0.00001,
									l2 : 25.4
								}
								});
						break;
			}
		}
	});
	
	var tappingModel = Backbone.Model.extend({
		
		defaults : {
			'taps' : '',
			'Q' : 150,
			'a0' : 0.5961,
			'level':"l3",
			'config' : {},
			'graphdata':[]
			
		},
		idAttribute: "key"	
	});
	
	var temperatureModel = Backbone.Model.extend({
		initialize : function() {
				this.bind("change:service", function() {
					this.changeService();
				});
				this.bind("change:temp", function() {
					this.changeTemp();
				});
		},
		defaults : {
			'temp' : '',
			'service' :'',
			'optValues':[],
			'Q' : 150,
			'a0' : 0.5961,
			'level':"l4",
			'config' : {},
			'graphdata':[]
		},
		idAttribute: "key"	,
		
		changeService : function(){
			var serv = this.get('service');
			switch(serv) {
						case "--Select--":
								this.set({
									config : {}
							});
						break;
						
						case "Steam" :
							this.set({
								config : {
									densityvalue : 0.598,
									meu : 0.00001227,
									l2 : 25.4
								}
								});
							this.set({
								optValues : [130,140,150,160]
								});
						break;
						case "Air" :
							this.set({
								config : {
									densityvalue : 1.2050,
									meu : 0.00001837,
									l2 : 25.4
								}
								});
							this.set({
								optValues : [10,30,40,50]
							});
						break;
			}
		},
		
		changeTemp : function(){
			var t = this.get('temp');
			switch(t) {
						case "--Select--":
								this.set({
									config : {}
							});
						break;
						case 0 :
							this.set({
								config : {
									densityvalue : 1.293,
									meu : 1.736e-5,
									l2 : 25.4
								}
								});
						break;
						case 10 :
							this.set({
								config : {
									densityvalue : 2.453,
									meu : 1.787e-5,
									l2 : 1
								}
								});
						break;
						case 20 :
							this.set({
								config : {
									densityvalue : 3.354,
									meu : 1.837e-5,
									l2 : 25.4
								}
								});
						break;
						case 30 :
							this.set({
								config : {
									densityvalue : 3.379,
									meu : 1.886e-5,
									l2 : 3
								}
								});
						break;
						case 40 :
							this.set({
								config : {
									densityvalue : 5.489,
									meu : 1.934e-5,
									l2 : 4
								}
								});
						break;
						case 50 :
							this.set({
								config : {
									densityvalue : 7.433,
									meu : 1.982e-5,
									l2 : 6
								}
								});
						break;
						case 130 :
							this.set({
								config : {
									densityvalue : 1.496,
									meu : 13.24e-6,
									l2 : 2.701
								}
								});
						break;
						case 140 :
							this.set({
								config : {
									densityvalue : 1.966,
									meu : 13.54e-6,
									l2 : 3.613
								}
								});
						break;
						case 150 :
							this.set({
								config : {
									densityvalue : 2.547,
									meu : 13.93e-6,
									l2 : 4.758
								}
								});
						break;
						case 160 :
							this.set({
								config : {
									densityvalue : 3.258,
									meu : 14.32e-6,
									l2 : 6.18
								}
								});
						break;
						
			}
			
			ORIFICE.JSon.obj.rhoVal = (this.get('config').densityvalue);
			ORIFICE.JSon.obj.mewVal = (this.get('config').meu);
			ORIFICE.JSon.obj.pressureVal = (this.get('config').l2);
		}
	});
	return {
		measurementModel : measurementModel,
		serviceModel : serviceModel,
		tappingModel : tappingModel,
		temperatureModel : temperatureModel
	}
})();
