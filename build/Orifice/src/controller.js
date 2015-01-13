ORIFICE.controller = (function() {
	var obj = {};
	var paper1 = ORIFICE.diagram.diag.paper;
	var prev = 0;
	var measurementModel, measurementCollection = new ORIFICE.collection.measurementCollection();
	var serviceModel, serviceCollection = new ORIFICE.collection.serviceCollection();
	var tappingModel, tappingCollection = new ORIFICE.collection.tappingCollection();
	var temperatureModel, temperatureCollection = new ORIFICE.collection.temperatureCollection();
	var currentModel, currentCollection, service = '#87CEEB';
	var D;
	var dataSet = [], m = 1, nxtM = 0, nxtS = 0, nxtTap = 0, nxtTemp = 0, storeDataM = [], storeDataS = [], storeDataTap = [], storeDataTemp = [];
	$("#Slider").slider({
		range : "min",
		min : 1000,
		max : 3000,
		value : 1000,
		slide : function(event, ui) {
			Q = ui.value;
			$("#lpm").val(Q);
			measurementModel.set({
				'Q' : Q
			});
		}
	});
	if($("#Slider").slider("value") == 1000){
		$("#lpm").val("");
	}
	
	obj.enable = function(id) {
		$(id).attr({
			'disabled' : false
		});
		$(id).addClass('greenbtn');
	}
	/*Measurement Level*/
	//set beta value into model
	obj.setMid = function() {
		measurementModel = new ORIFICE.model.measurementModel()
		measurementModel.set({
			'key' : m
		});
		currentModel = measurementModel;
		currentCollection = measurementCollection;
	}

	obj.setBetaMeasurement = function(b) {
		measurementModel.set({
			'beta' : b
		});
	}
	//set d value into model
	obj.setdMeasurement = function(D) {
		measurementModel.set({
			'D' : D
		});
		changeDForMeasurement();
	}
	//according to 'd' make changes in Flange tap diagram
	changeDForMeasurement = function() {
		D = measurementModel.get('D');
		colorset2 = changed(paper1, colorset2);
		var paper2 = ORIFICE.diagram.diag.paper2;
		colorset = changed(paper2, colorset);
	}
	changed = function(paper, colorset) {
		d = measurementModel.get('d');
		colorset.remove();
		colorset = paper.set();
		switch(d) {
			case 15:
				y2 = 108;
				y1 = 127;
				a = 206;
				b = 268;
				c = 210;
				add = 108;
				n = 10;
				break;
			case 25:
				y2 = 101;
				y1 = 119;
				a = 190;
				b = 268;
				c = 210;
				add = 140;
				n = 13;
				break;
			case 50:
				y2 = 98;
				y1 = 107;
				a = 170;
				b = 258;
				c = 200;
				add = 180;
				n = 17;
				break;
		}
		var middleBottom_rod = paper.path("m 381 405 l -8 0 l 0 " + -y2 + " l 8 -8 z").toBack();
		middleBottom_rod.attr({
			fill : '#666666'
		});
		var middleUpper_rod = paper.path("m 373 103 l 7 0 l 0 " + y1 + " l -7 -7 z").attr({
			fill : '#666666'
		});
		colorset.push(middleBottom_rod, middleUpper_rod).attr({
			'stroke' : '#000',
			fill : '#666666'
		});
		var a1 = a + add, b1 = b - 18, c1 = c + 110; p = [], p1 = [];
		for( i = 0; i <= n; i++) {
			path = "M 40  " + a + " l 230 0 C 350, " + a + " 300," + b + " 700," + c + "";
			a += 5;
			b += 5;
			c += 5;
			p[i] = paper.path(path).attr({
				stroke : service,
				'stroke-width' : 3
			});
			colorset.push(p[i]);
		}
		colorset.push(paper.path("M 40 260 l 255 0").attr({
			stroke : service,
			'stroke-width' : 3
		})); q = [], q1 = [];
		for( i = 0; i <= n; i++) {
			path = "M 40  " + a1 + " l 230 0 C 350, " + a1 + " 300," + b1 + " 700," + c1 + "";
			a1 -= 5;
			b1 -= 5;
			c1 -= 5;
			q[i] = paper.path(path).attr({
				stroke : service,
				'stroke-width' : 3
			});
			colorset.push(q[i]);
		};
		return colorset;
	}

	obj.calculate = function(cd, id,level) {
		var beta = measurementModel.get('beta');
		//var D = (d / beta);
		var d = D*beta*0.001;
		//console.log('D ' + D)
		var A = 3.1416 * ((D * 0.001) * (D * 0.001)) / 4;
		//console.log('A  ' + A )
		var userService = $('#service').val();
		if(level==="level4"){
			
			userService=$('#TempService').val();
		}
		Q = currentModel.get('Q')*1.667*0.00001;
		Q = Q/60;
		if(userService == "Steam"){
			Q=Q*1.02;
		}else if(userService == "Air"){
			Q=Q*1699;
		}
		var V = parseFloat((Q / A));
		
		var config = currentModel.get('config');
		L2 = parseFloat((config.l2 / D).toFixed(4));
		L1 = L2;
		
		if(level==="level4"){
			currentModel.set({
				'taps':obj.selectedTap

			})
		}
		var tap = currentModel.get('taps');
		switch (tap) {
				case "Corner" :
					L1 = 0;
					L2 = 0;
					var c = serviceModel.get('config');
					currentModel.set({
						'config' : c
					});
					config = currentModel.get('config');
					break;

				case "D and D/2" :
					L1 = 1;
					L2 = 0.47;
					var c = serviceModel.get('config');
					currentModel.set({
						'config' : c
					});
					config = currentModel.get('config');
					break;
			}	
			
		
		if(level==="level4"){
			config.densityvalue=ORIFICE.JSon.obj.rhoVal;
			config.meu=ORIFICE.JSon.obj.mewVal;
		}
		
			
		var ReD = parseFloat((V * config.densityvalue * D * 0.001) / config.meu);
		//console.log('ReD  ' + ReD )
		var a = parseFloat(((Math.pow(((19000 * beta ) / ReD), 0.8))).toFixed(4));
		//console.log('a  ' + a );

		var M2 = parseFloat(((2 * L2) / (1 - beta)).toFixed(4));
		//console.log('M2  ' + M2 )
		var a0 = currentModel.get('a0');

		var a1 = parseFloat((0.0261 * (Math.pow(beta, 2))).toFixed(8));
		//console.log('a1  ' + a1 )
		var a6 = parseFloat((0.216 * Math.pow(beta, 8)).toFixed(8));
		//console.log('a6  ' + a6 )
		var a2 = parseFloat((0.000521 * (Math.pow(Math.pow(10, 6) * beta / ReD, 0.7))).toFixed(8));
		//console.log('a2  ' + a2)
		var a3 = parseFloat((((0.0188 + 0.0063 * a) * Math.pow(beta, 3.5)) * (Math.pow(Math.pow(10, 6) / ReD, 0.3))).toFixed(8));
		//console.log('a3  ' + a3)
		var a4 = parseFloat(((0.043 + (0.08 * Math.pow(2.718, (-10 * L1))) ) - (0.123 * Math.pow(2.718, (-7 * L1)))).toFixed(8));
		//console.log('a4  ' + a4)
		var a5 = parseFloat(((1 - 0.11 * a) * Math.pow(beta, 4) / (1 - Math.pow(beta, 4))).toFixed(8));
		
		//console.log('a5  ' + a5)
		var a7 = parseFloat((0.031 * (M2 - (0.8 * Math.pow(M2, 1.1))) * Math.pow(beta, 1.3)).toFixed(8));
		//console.log('a7  ' + a7)
		var cd = (a0 + a1 - a6 + a2 + a3 + (a4 * a5) - a7);
		//console.log('cd  ' + cd)
		if(D < 71.12) {
			cd = (cd + 0.011 * ((0.75 - beta ) * (2.8 - (D / 25.4))));
		}
		cd = parseFloat(cd.toFixed(4));
		//console.log('cd  ' + cd)
		$(id).html(cd);
		var dp1 = (Math.pow(Q, 2) * (1 - Math.pow(beta, 4)) * 8 * config.densityvalue).toFixed(8);
		//console.log('dp1 ' + dp1)
		var dp2 = (Math.pow((cd * 3.1416 ), 2) * Math.pow(d, 4)).toFixed(8);
		//console.log('dp2 ' + dp2)
		deltap = (parseFloat(dp1 / dp2)).toFixed(2)*0.102;
		console.log("DeltaP:"+deltap)
		//alert(deltap);
		//alert("Answer : " + deltap);
	};
	checkValue = function(output) {
		if(output == prev) {
			prev = output;
			return true;
		} else {
			prev = output;
			return false;
		}
	}
	cnt=0;
	obj.checkUserVal = function(output, id, plot, next, level) {
		var minimumRange = deltap - 0.1;
		var maximumRange = deltap + 0.1;
		var roundVal = Math.round(deltap);
		if(!(isNaN(output))) {
			if(deltap == output || (output <= maximumRange && output >= minimumRange) || roundVal == output) {
				var check = checkValue(output);
				if(check == true) {
					alert("Please change Value");
					return 1 ;
				} else {
					output = parseFloat(output);
					$(id).html("<span class='label'>Correct</span>");
					setTimeout(function() {
						$(id).html("<span class='label'>Submit</span>");
					}, 3000);
					var i = currentModel.get('key');
					var existingModel = currentCollection.get(i);
					var Q = currentModel.get('Q');
					dataSet.push([Q, output]);
					dataSet = dataSet.sort(function(a, b) {
						return a[1] - b[1];
					});
					if(!existingModel) {
						currentModel.set({
							graphdata : dataSet
						});
						var len = dataSet.length;
						if(len >= 4) {//////////////////// Temporary adjustment;make it 4 again
							currentCollection.add(currentModel);
							obj.enable(plot);
							obj.enable(next);
							obj.enable(level);
							// var str= plot; 
							// var n=str.search("#plotMeasure");
							// var str=plot;
							// var n=str.substr(5,13);
							if(plot=="#plotMeasure")
							{
								$("#plotMeasure1").hide();
								$("#plotMeasure").show();
							}
							else if(plot=="#plotService"){
								$("#plotService1").hide();
								$("#plotService").show();
							}
							else if(plot=="#plotTemp"){
								$("#plotTemp1").hide();
								$("#plotTemp").show();
							}
							else if(plot=="#plotTapping"){
								$("#plotTapping1").hide();
								$("#plotTapping").show();
							}
						}
					} else {
						currentModel.set({
							graphdata : dataSet
						});
					}
					return 1;
				}
			} else {
				cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer");
					alert("Correct Answer is "+ deltap);
					cnt=0;
				}
				$(id).addClass('redbtn');
				$(id).effect("shake", {
					times : 2
				}, 60);
				$(id).html("<span class='label'>Re-Calculate</span>");
				setTimeout(function() {
					$(id).removeClass('redbtn');
					$(id).html("<span class='label'>Submit</span>");
				}, 4000);
				return 0;
			}
		} else {
			alert("Enter Numeric digit");
		}
	}

	obj.changeModel = function(level) {
		obj.selectedTap = currentModel.get('taps');
		switch(level) {
			case "measurement":
				currentModel = measurementModel;
				currentCollection = measurementCollection;
				break;
			case "service":
				if(serviceModel != undefined) {
					currentModel = serviceModel;
					currentCollection = serviceCollection;
				}
				break;
			case "tapping":
				if(tappingModel != undefined) {
					currentModel = tappingModel;
					currentCollection = tappingCollection;
				}
				break;
			case "temperature":
				if(temperatureModel != undefined) {
					currentModel = temperatureModel;
					currentCollection = temperatureCollection;
				}
				break;
		}
	}

	obj.nextSetMeasure = function() {
		dataSet = [];
		nxtM++;
		m++;
		storeDataM = graphData;
		$('#plotMeasure').attr({
			'disabled' : true
		});
		$('#plotMeasure').removeClass('greenbtn');
		$('#betaMeasurement').val('').trigger("liszt:updated");
		$('#dMeasurement').val('').trigger("liszt:updated");
	}

	obj.nextSetService = function() {
		dataSet = [];
		nxtS++;
		storeDataS = graphData;
		$('#plotService').attr({
			'disabled' : true
		});
		$('#plotService').removeClass('greenbtn');
		$('#service').val('').trigger("liszt:updated");
	}

	obj.nextSetTapping = function() {
		dataSet = [];
		nxtTap++;
		storeDataTap = graphData;
		$('#plotTapping').attr({
			'disabled' : true
		});
		$('#plotTapping').removeClass('greenbtn');
		$('#Tapp').val('').trigger("liszt:updated");
	}

	obj.nextSetTemp = function() {
		dataSet = [];
		nxtTemp++;
		storeDataTemp = graphData;
		$('#plotTemp').attr({
			'disabled' : true
		});
		$('#plotTemp').removeClass('greenbtn');
		$('#TempService').val('').trigger("liszt:updated");
		$('#Temp').val('').trigger("liszt:updated");
	}
	var graphOne = {
		chart : {
			renderTo : 'graph',
			type : 'spline',
			zoomType : 'x',
		},
		rangeSelector : {
			selected : 1
		},
		credits : {
			enabled : false
		},
		title : {
			text : 'Characteristic Curve of Orifice Plate',
			x : -20
		},
		xAxis : {
			title : {
				text : 'Flow in lph'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : 'Differential Pressure (mmWC)'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		tooltip : {
			formatter : function() {
				return 'X = ' + this.x + '  Y = ' + this.y.toFixed(2);
			}
		},
		series : []
	}
	plot = function(data, nxt, storeData) {
		graphOne.series = [];
		graphData = [];
		if(data != 0 && nxt == 0) {
			graphData.push(data);
		} else {
			graphData = storeData;
			graphData.push(data);
		}

		for(var i = 0; i < graphData.length; i++) {
			graphOne.series.push({
				name : '',
				data : []
			});
			graphOne.series[i].name = "Graph " + (i + 1);
			graphOne.series[i].data = graphData[i];
		}
		
		if(currentModel.get('level')!="l1"){
		
				graphOne.xAxis.title.text = 'Flow in lph / cfm / Kg/hr';
   		 }else{
   		 	graphOne.xAxis.title.text = 'Flow in lph';
   		 }
    
		var chart = new Highcharts.Chart(graphOne);
	}

	obj.plotDataMeasure = function() {
		var id = measurementModel.get('key');
		var c = measurementCollection.get(id);
		var data = c.get('graphdata');
		var nxt = nxtM;
		var storeData = storeDataM;
		plot(data, nxt, storeData);
	}

	obj.plotDataService = function() {
		var id = serviceModel.get('key');
		var c = serviceCollection.get(id);
		var data = c.get('graphdata');
		var nxt = nxtS;
		var storeData = storeDataS;
		plot(data, nxt, storeData);
	}

	obj.plotDataTapping = function() {
		var id = tappingModel.get('key');
		var c = tappingCollection.get(id);
		var data = c.get('graphdata');
		var nxt = nxtTap;
		var storeData = storeDataTap;
		plot(data, nxt, storeData);
	}

	obj.plotDataTemp = function() {
		var id = temperatureModel.get('key');
		var c = temperatureCollection.get(id);
		var data = c.get('graphdata');
		var nxt = nxtTemp;
		var storeData = storeDataTemp;
		plot(data, nxt, storeData);
	}
	//serv

	obj.setService = function(s) {
		serviceModel = new ORIFICE.model.serviceModel();
		serviceModel.set({
			'service' : s
		});
		serviceModel.set({
			'key' : s
		});
		currentModel = serviceModel;
		currentCollection = serviceCollection;
		dataSet = [];
		changeColor();
	}

	$("#Slider1").slider({
		range : "min",
		min : 1000,
		max : 3000,
		value : 1000,
		slide : function(event, ui) {
			Q = ui.value;
			$("#lpm1").val(ui.value);
			serviceModel.set({
				'Q' : Q
			});
		}
	});
	
	
	
	
	changeColor = function() {
		console.log(JSON.stringify(currentModel))
		var serv = currentModel.get('service');
		switch(serv) {
			case 'Dilute HCL':
				service = '#D4FFA9';
				colorset2 = changed(paper1, colorset2);
				var paper2 = ORIFICE.diagram.diag.paper2;
				colorset = changed(paper2, colorset);
				break;
			case 'Steam':
				service = '#AAAEAA';
				colorset2 = changed(paper1, colorset2);
				var paper2 = ORIFICE.diagram.diag.paper2;
				colorset = changed(paper2, colorset);
				break;
			case 'Air':
				service = '#E2E5E2';
				colorset2 = changed(paper1, colorset2);
				var paper2 = ORIFICE.diagram.diag.paper2;
				colorset = changed(paper2, colorset);
				break;
		}
	}
	//tap
	obj.setTapp = function(t) {
		tappingModel = new ORIFICE.model.tappingModel();
		tappingModel.set({
			'taps' : t
		});
		tappingModel.set({
			'key' : t
		});
		currentModel = tappingModel;
		currentCollection = tappingCollection;
		dataSet = [];
		changeTapping();
	}

	$("#Slider2").slider({
		range : "min",
		min : 1000,
		max : 3000,
		value : 1000,
		slide : function(event, ui) {
			$("#lpm2").val(ui.value);
			tappingModel.set({
				'Q' : ui.value
			});
		}
	});
	changeTapping = function() {
		var t = tappingModel.get('taps');
		if(t == 'Corner') {
			ORIFICE.diagram.diag.CornerTapsDiagram();
			var paper2 = ORIFICE.diagram.diag.paper2;
			colorset = changed(paper2, colorset);
			paper2.path("m 374, 103 l 5 0").attr({
				'stroke-width' : '2',
				stroke : '#666666'
			});
			var r = paper2.rect(373, 403, 8, 30).attr({
				fill : '#666666'
			});
			r.toBack();
			paper2.path("m 373.5, 404 l 7 0").attr({
				'stroke-width' : '4',
				stroke : '#666666'
			});
		} else {
			ORIFICE.diagram.diag.DTapsDiagram();
			var paper2 = ORIFICE.diagram.diag.paper2;
			colorset = changed(paper2, colorset);
		}
	}
	//temp
	obj.setTempService = function(servT) {
		temperatureModel = new ORIFICE.model.temperatureModel();
		temperatureModel.set({
			'service' : servT
		});
		if(temperatureModel.get('optValues').length != 0) {
			option = "<option>--Select--</option>"
			_.each(temperatureModel.get('optValues'), function(result) {
				option += "<option>" + result + "</option>";
			});
			$('#Temp').html(option);
			$('#Temp').trigger("liszt:updated");
		}//if
		if(servT == 'Steam') {
			service = '#AAAEAA';
			colorset2 = changed(paper1, colorset2);
			var paper2 = ORIFICE.diagram.diag.paper2;
			colorset = changed(paper2, colorset);
		} else {
			if(servT == 'Air') {
				service = '#E2E5E2';
				colorset2 = changed(paper1, colorset2);
				var paper2 = ORIFICE.diagram.diag.paper2;
				colorset = changed(paper2, colorset);
			}
		}
		currentModel = temperatureModel;
		currentCollection = temperatureCollection;
		dataSet = [];
	}

	obj.setTemp = function(t) {
		temperatureModel.set({
			'temp' : t
		});
		temperatureModel.set({
			'key' : t
		});
		dataSet = [];
		currentModel = temperatureModel;
	}

	$("#Slider3").slider({
		range : "min",
		min : 1000,
		max : 3000,
		value : 1000,
		slide : function(event, ui) {
			$("#lpm3").val(ui.value);
			temperatureModel.set({
				'Q' : ui.value
			});
		}
	});
	return {
		obj : obj
	}
})();
