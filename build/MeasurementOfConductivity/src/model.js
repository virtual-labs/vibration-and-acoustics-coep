

CONDUCTIVITY.model = (function() {
	var measurementModel  = Backbone.Model.extend({
			defaults : {
						substance : "--select--",
						concentration : [],
						specificconductance : 0,
						graphdata : []
			},
			idAttribute: "key",
			initialize : function() {
				this.bind("change:substance", function() {
					this.changeSubstance()
				});
			},
			changeSubstance : function() {
				var source = this.get('substance');
				//this.set({'key' : source});
					switch(source) {
						case "--Select--":
								this.set({
									concentration : []
							});
						break;
						case "HCL" :
							this.set({
								concentration : [{
									value : 5,
									A0 : 426,
									a : 0.37,
									b : 0.38,
									c : 1.402,
									w : 36.46,
									C : 1.023,
									CR : 653786.38,
									Tc : 0.0158, 
									t : 29
								}, {
									value : 10,
									A0 : 426,
									a : 0.37,
									b : 0.38,
									c : 2.873,
									w : 36.46,
									C : 1.048,
									CR : 1792512.11, 
									Tc : 0.0156, 
									t : 29
								}, {
									value : 30,
									A0 : 426,
									a : 0.37,
									b : 0.38,
									c : 9.453,
									w : 36.46,
									C : 1.149,
									CR : 13911388.55, 
									Tc : 0.0152, 
									t : 29
								}]
							});
						break;
						
						case "KCL" :
							this.set({
								concentration : [{
									value : 5,
									A0 : 149.8,
									a : 0.63,
									b : 0.64,
									c : 0.689,
									w : 74.56,
									C : 1.029,
									CR : 94751.08, 
									Tc : 0.0201, 
									t : 29
								}, {
									value : 10,
									A0 : 149.8,
									a : 0.63,
									b : 0.64,
									c : 1.424,
									w : 74.56,
									C : 1.062,
									CR : 247354.28, 
									Tc : 0.0188, 
									t : 29
								}, {
									value : 20,
									A0 : 151.4,
									a : 0.63,
									b : 0.64,
									c : 3.019,
									w : 74.56,
									C : 1.126,
									CR : 831010.53, 
									Tc : 0.0168, 
									t : 29
								}]
						});
						break;
						
					case "H2SO4" :
							this.set({
									concentration : [{
										value : 50,
										A0 : 151.4,
										a : 1.24,
										b : 1.14,
										c : 8.026,
										w : 87.14,
										C : 1.399,
										CR : 8064490.53, 
										Tc : 0.0193, 
										t : 29
									}]
								});
						break;
						
					case "NaCl" :
							this.set({
								concentration : [{
								A0 : 126.5,
								a : 0.70,
								b : 0.74,
								c : 1.832,
								value : 10,
								w : 58.44,
								C : 1.071,
								CR : 326352.22, 
								Tc : 0.0214, 
								t : 29
							}]
						});
						break;
						
					case "NaOH" :
							this.set({
								concentration : [{
									value : 5,
									A0 : 246.5,
									a : 0.47,
									b : 0.3,
									c : 1.317,
									w : 40.01,
									C : 1.055,
									CR : 277803.02, 
									Tc : 0.0450, 
									t : 29
								}, {
									value : 30,
									A0 : 246.5,
									a : 0.47,
									b : 0.3,
									c : 9.979,
									w : 40.01,
									C : 1.331,
									CR : 6171674.79, 
									Tc : 0.0201, 
									t : 29
								}]
						});
						break;
						
					default:
						this.set({
							concentration : []
						});
					}
				}
			});
	
	
	var temperatureModel  = Backbone.Model.extend({
		defaults : {
						concentration:'',
						conductivityAtTemp : 0,
						graphdata : []
			},
		idAttribute: "id",
		
	});
	
	var contaminationModel  = Backbone.Model.extend({
		defaults : {
						concentration : [],
						cellconstant : 0,
						contamination : 0,
						contaminationVal : [], 
						m : ''
			},
		idAttribute: "id",
		
		initialize : function() {
				this.bind("change:contamination", function() {
					this.changecontamination()
				});
			},
				
	changecontamination : function(){
		var cont = this.get('contamination');
		switch(cont){
			case 0.1 :
			this.set({
				contaminationVal : [{
					lnew : 0.99,
					A : 10,
					Bnew : 0.11,
					cg : 0.1
				}]
			});
			break;

		case 0.2 :
			this.set({
				contaminationVal : [{
					lnew : 0.98,
					A : 10,
					Bnew : 0.12,
					cg : 0.2
				}]
			});
			break;
		case 0.3 :
			this.set({
					contaminationVal : [{
						lnew : 0.97,
						A : 10,
						Bnew : 0.13,
						cg : 0.3
					}]
			});
			break;
		case 0.4 :
			this.set({
					contaminationVal : [{
						lnew : 0.96,
						A : 10,
						Bnew : 0.14,
						cg : 0.4
					}]
			});
			break;
		case 0.5 :
			this.set({
				contaminationVal : [{
						lnew : 0.95,
						A : 10,
						Bnew : 0.15,
						cg : 0.5
				}]
			});
			break;
		}
	}
	
		
	});
	return{
		measurementModel : measurementModel,
		temperatureModel : temperatureModel,
		contaminationModel : contaminationModel
	}
})();
