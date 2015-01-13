//all logic goes here
RTD.handler = (function() {
	var obj = {};
	var paper1 = new Raphael(document.getElementById('dynamicDiagram'), 396, 676);
	var staticCollection = new RTD.collection.staticCollection();
	var dynamicCollection = new RTD.collection.dynamicCollection();
	var i = 1, arr = [], alpha1, graphDataContainer = [], nxt = 0, storeDataStatic = [], toughForBareElement, timeConstantForBareElement
	var dModel = new RTD.model.dynamicModel();
	var drawnPath, temp = 1, myPath = paper1.path(drawnPath).attr({
		"stroke-width" : 1,
		"stroke" : "green",
	});
	var b = 1, w = 1, thm = 1
	obj.count = 0;
	obj.setID = function() {
		stModel = new RTD.model.staticModel();
		stModel.set({
			'key' : i
		});
	}
	
	obj.setM = function(material) {
		stModel.set({
			material : material
		});

	}//setM

	obj.setR = function(R0) {
		stModel.set({
			R0 : R0
		});
	}//setR

	obj.selectMaterial = function() {
		var m = stModel.get('material');
		$("#T10").attr('value', "Platinum");
		//console.log(m)
		switch (m) {
			case "0" :
				$("#Alpha").html("");
				$("#Range").html("");
				break;

			case "Platinum" :
				alpha1 = 0.00385;
				$("#Alpha").html("&alpha; value: " + alpha1);
				$("#Range").html("Temperature range : -200 to 850");
				break;

			case "Copper" :
				alpha1 = 0.00427;
				$("#Alpha").html("&alpha; value: " + alpha1);
				$("#Range").html("Temperature range : -100 to 260");
				break;

			case "Nickel" :
				alpha1 = 0.00672;
				$("#Alpha").html("&alpha; value: " + alpha1);
				$("#Range").html("Temperature range : -100 to 260");
				break;

			case "Balco" :
				alpha1 = 0.00518;
				$("#Alpha").html("&alpha; value: " + alpha1);
				$("#Range").html("Temperature range : -100 to 204");
				break;
		}
		$("#Static-Output").append("<label class='text'>Material: " + m + "</label>");
		return true;
	}//selectMaterial

	obj.Resistance = function() {
		res = stModel.get('R0');
		Ro = parseInt(res);
		$("#Static-Output").append("<br><label class='text'>Resistance (R<sub>0</sub>) :" + res + "</label> ");
	}//selectResistance

	obj.GetTemperature = function(x) {
		var opt = stModel.get('material');
		CalculateOutput(opt, Ro);
		x < 0 ? "" : $('#Submit').addClass('greenbtn');
	}//GetTemperature
	CalculateOutput = function(opt, Ro) {
		if(!!opt && !!Ro) {
			$("#Material , #resistance").attr("disabled", true);
			switch(opt) {
				case "Platinum":
					deltaT = rand(-200, 850);
					break;
				case "Copper":
					deltaT = rand(-100, 260);
					break;
				case "Nickel":
					deltaT = rand(-100, 260);
					break;
				case "Balco":
					deltaT = rand(-100, 204);
					break;
			}
			// if(deltaT < 0) {
				// $("#Temperature").html(deltaT);
				// alert("Its a negative value. Please Re-select")
			// } else {
				$("#Temperature").html(deltaT + '&deg;C');
				OutputRt = (Ro * (1 + alpha1 * deltaT)).toFixed(2);
				//alert("" + OutputRt)
				$('#Rttext').val('');
				$('#Submit').attr('disabled', false);
			//}
			$("#Static-Output").append("<br><label class='text'>Measurement Temperature :" + deltaT + "</label> ");
		} else {
			alert("Select proper value");
		}
	}//CalculateOutput
	rand = function(min, max) {
		return Math.round(min + Math.random() * (max - min));
	}//rand
	cnt=0;
	obj.calculateRtd = function(userEnteredOutputValue) {
		
		var val
		if(!(isNaN(userEnteredOutputValue))) {
			var lowerRtValue = parseFloat(OutputRt) - 0.5;
			var HigherRtValue = parseFloat(OutputRt) + 0.6;
			//alert(OutputRt);
			if((lowerRtValue <= userEnteredOutputValue) && (HigherRtValue >= userEnteredOutputValue) || (userEnteredOutputValue == OutputRt)) {

				$("#Submit").html("<span class='label'>Correct</span>");
				setTimeout(function() {
					$("#Submit").html("<span class='label'>Submit</span>");
				}, 3000);
				var id = stModel.get('key')
				var existingModel = staticCollection.get(id);
				userEnteredOutputValue = parseFloat(userEnteredOutputValue);
				graphDataContainer.push([deltaT, userEnteredOutputValue]);
				graphDataContainer = graphDataContainer.sort(function(a, b) {
					return a[1] - b[1];
				})
				if(!existingModel) {
					stModel.set({
						staticArray : graphDataContainer
					});
					if(graphDataContainer.length >= 3) {
						$("#Plot1").hide();
						$("#Plot").show();
						$('#Plot').attr('disabled', false);
						$('#Plot').addClass('greenbtn')
						
						staticCollection.add([stModel]);
						//console.log('collection: '+JSON.stringify(staticCollection));
					} else {
						stModel.set({
							staticArray : graphDataContainer
						});
						//console.log('collection: '+JSON.stringify(staticCollection));
					}
				}
				RTD.JSon.obj.eval = 1;
				val = true;
			} else {
				cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer");
					alert("Correct answer is "+OutputRt); 
					cnt=0;
				}
				$("#Submit").addClass('redbtn');
				$("#Submit").effect("shake", {
					times : 2
				}, 60);
				$("#Submit").html("<span class='label'>Re-Calculate</span>");
				setTimeout(function() {
					$("#Submit").removeClass('redbtn');
					$("#Submit").html("<span class='label'>Submit</span>");
				}, 4000);
				val = false;
				RTD.JSon.obj.eval = 0;
			}
			$("#Static-Output").append("<br><label class='text'>Your Answer :" + userEnteredOutputValue + "</label> ");
		} else {
			alert("Enter Numeric digit");
		}
		return val
	}//calculateRtd
	var staticGraph = {

		chart : {
			renderTo : 'graph', 
			type: 'line',    
			zoomType: 'x',
		},
		   
		rangeSelector : {
				selected : 1
			},
		title : {
			text : "Temperature vs Resistance</sub>",
			x : -20
		},
		xAxis : {
			title : {
				text : "Temperature (°C)"
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : 'Resistance (ohm)'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			},
		
		},
		 
		tooltip : {
			shared: true,
			formatter : function() {
				return 'X = ' + this.x.toFixed(2) + '  Y = ' + this.y.toFixed(2);
			}
		},
		series:[],
	}
	
	obj.plotStaticData = function() {
		var x
		$('#nextsetvalue').addClass('greenbtn');
		staticGraph.series = [];
		staticGraphData = [];
		var id = staticCollection.length;

		var c = staticCollection.get(id);

		var Static = c.get('staticArray')
		//alert('Static '+Static)

		if(Static.length != 0 && nxt == 0) {
			staticGraphData.push(Static);
		} else {
			staticGraphData = storeDataStatic;
			staticGraphData.push(Static);
		}
		for(var j = 0; j < staticGraphData.length; j++) {
			staticGraph.series.push({
				name : '',
				data : []
			});
			staticGraph.series[j].name = "Graph " + (j + 1);
			staticGraph.series[j].data = staticGraphData[j];
		}//for

		 chart = new Highcharts.Chart(staticGraph);
	}//plotStaticData

 
	
	obj.next = function() {
		storeDataStatic = staticGraphData;
		nxt++;
		graphDataContainer = [];
		i++;
		obj.setID();
		$('#Plot').attr('disabled', true);
		$('#Plot').removeClass('greenbtn');
	}

	obj.animateBare = function() {
		if(b == 1) {
			arr = [{
				stroke : "M 182 520",
				time : 0
			}, {
				stroke : "l -7 -10",
				time : 500
			}, {
				stroke : "l 7 -10",
				time : 500
			}, {
				stroke : "l -7 -10",
				time : 500
			}, {
				stroke : "l 7 -10",
				time : 500
			}, {
				stroke : "l -7 -10",
				time : 500
			}, {
				stroke : "l 7 -10",
				time : 500
			}, {
				stroke : "l -7 -10",
				time : 500
			}, {
				stroke : "l 7 -10",
				time : 500
			}, {
				stroke : "l 0 -53",
				time : 500
			}];
			drawnPath = arr[0].stroke;

			paper1.path("M 160 420").animate({
				path : "M 160 420 l 30 0",
				stroke : '#000',
				opacity : 1
			}, 800, function() {
				paper1.path("M 190 420").animate({
					path : "M 190 420 l 0 110",
					stroke : '#000',
					opacity : 1
				}, 1500, function() {
					paper1.path("M 190 530").animate({
						path : "M 190 530 l -30 0",
						stroke : '#000',
						opacity : 1
					}, 800, function() {
						paper1.path("M 160 530").animate({
							path : "M 160 530 l 0 -110",
							stroke : '#000',
							opacity : 1
						}, 1500, function() {
							var bareElemWithSheathWire = paper1.path("M 170 387").animate({
								path : "M 170 387 l 0 133",
								stroke : "green"
							}, 500, function() {
								var bareElemWithSheathWire = paper1.path("M 170 520").animate({
									path : "M 170 520 l 12 0",
									stroke : "green"
								}, 700, function() {
									animateMyPath();
								})
							})
						})
					})
				})
			})
		}
		b++;
	}//animateBare
	animateMyPath = function() {
		if(temp < arr.length) {
			drawnPath += arr[temp].stroke;
			myPath.animate({
				path : drawnPath
			}, arr[temp].time, animateMyPath);
			temp++;
		}
	}

	obj.animateSheath = function() {
		if(w == 1) {
			var t = "M 210 540 l 0 -310" + "M 140 230 l 0 310" + "M 160 550 l 30 0" + "M 160 550 s -10,0 -20,-10" + "M 190 550 s 10,0 20,-10" + "M 210 230 l 2 0 l 0 -30 l 18 -10 l 0 -40 l -110 0 l 0 40 l 18 10 l 0 30 l 2 0" + "M 150 378 l 0 152" + "M 200 387 l 0 143" + "M 160 540 l 30 0" + "M 160 540 s -5,0 -10,-10" + "M 190 540 s 5,0 10,-10" + "M 140 380 c 20,-10 20,20 70,5" + "M 170 150 l 0 -60" + "M 180 150 l 0 -60"

			paper1.path("M 175 230").animate({
				path : t,
				opacity : 1
			}, 700, function() {
				var l1, l2
				for(var i = 400; i < 550; i += 10) {
					l1 = paper1.path("M 210 " + i + " l -10 -10")
				}

				for(var i = 390; i < 540; i += 10) {
					l2 = paper1.path("M 150 " + i + " l -10 -10")
				}
				var lines1 = paper1.path("M 203 545 l -9 -8" + "M 196 549 l -12 -10" + "M 185 550 l -12 -10" + "M 174 550 l-12 -10" + "M 162 550 l -23 -21");
			})
		}
		w++;
	}//animateWithsheath

	obj.animateThermowell = function() {
		if(thm == 1) {
			var thermowelPath = " M 138 230 l -15 0 l 0 310 " + "M 212 230 l 15 0 l 0 310" + "M 200 565 s 25,0 27,-26" + "M 147,565 s -25,0 -24,-26" + "M 200 565 l -53 0"

			paper1.path("M 175 540").animate({
				path : thermowelPath
			}, 1000, function() {
				for(var i = 235; i < 550; i += 5) {
					paper1.circle(216, i, 1).attr("fill", "black");
					paper1.circle(135, i, 1).attr("fill", "black");
					i = i + 5;

					paper1.circle(223, i, 1).attr("fill", "black")
					paper1.circle(128, i, 1).attr("fill", "black");

				}

				for(var i = 140; i < 210; i += 5) {
					paper1.circle(i, 557, 1).attr("fill", "black");
					i += 5;

					paper1.circle(i, 561, 1).attr("fill", "black")
				}

				paper1.circle(208, 551, 1).attr("fill", "black")
				paper1.circle(214, 558, 1).attr("fill", "black")
				paper1.circle(138, 551, 1).attr("fill", "black")
				paper1.circle(132, 556, 1).attr("fill", "black")
			});
		}
		thm++;
	}//animateThermowell

	obj.bareElementTimeConstantValue = function(k, row, s, L, x) {
		toughForBareElement = ((x / k) * row * L * s);
		timeConstantForBareElement = parseFloat((toughForBareElement)).toFixed(2);
		alert("The Time Constant is  " + timeConstantForBareElement + " seconds");
	}//bareElementTimeConstantValue

	obj.WSMaterial = function(opt1) {
		//alert(opt1)
		switch(opt1) {
			case "SS 304":
				L = (15 / (10 * 10 * 10)), k = 21.4, row = 8030, s = 500;
				break;
			case "SS 316":
				L = (15 / (10 * 10 * 10)), k = 21.4, row = 7990, s = 500;
				break;
			case "SS 410":
				L = (15 / (10 * 10 * 10)), k = 24.9, row = 7750, s = 460;
				break;
		}
		setWsThicknessOptions();
		var x = parseFloat(opt1 / (10 * 10 * 10));
		toughForWithShealth = ((x / k) * row * L * s);
	}//WS
	setWsThicknessOptions = function() {
		var temp = document.getElementById("WS2");
		if(dModel.get('withSheath').length == 0) {
			var v = 0.5
			for(var i = 0; i < 4; i++) {
				$("#WS2").trigger("liszt:updated");
				temp.options[temp.options.length] = new Option(v + ' mm', v);
				v = v + 0.5
			}
		}
	}

	obj.WSThickness = function(opt2) {
		var x = parseFloat(opt2 / (10 * 10 * 10));
		toughForWithThickness = ((x / k) * row * L * s);
		air();
		timeConstantForThickness = parseFloat(((toughForBareElement + toughForWithThickness + timeConstantForAir)).toFixed(2));

		alert("The Time Constant is  " + timeConstantForThickness + " seconds..");
		//alert(timeConstantForThickness);

		var r1 = deltaT * 0.632, u1 = timeConstantForThickness * 5;

		var WSarray = [[0, 0], [timeConstantForThickness, r1], [u1, deltaT]];
		dModel.set({
			'withSheath' : WSarray
		});
		//console.log(JSON.stringify(Call.obj.WSarray))

	}
	air = function() {
		var x = (0.2 / (10 * 10 * 10)), L = (15 / (10 * 10 * 10)), k = 0.025, row = 1.20, s = 1005;
		timeConstantForAir = ((x / k) * row * L * s);
	}

	obj.bareGraph = function() {
		var u1 = timeConstantForBareElement;
		var r1 = deltaT;
		var u2 = u1 * 5;
		var r = r1 * 0.632;
		u1 = parseFloat(u1);

		var b = dModel.get('bare');
		if(b.length == 0) {
			var bare = [[0, 0], [u1, r], [u2, r1]];
			dModel.set({
				'bare' : bare
			});
			dynamicCollection.add([dModel]);
		}
	}

	obj.withthermo = function(opt3) {
		switch(opt3) {
			case "SS 304":
				L1 = (15 / (10 * 10 * 10)), k1 = 21.4, row1 = 8030, s1 = 500;
				break;
			case "SS 316":
				L1 = (15 / (10 * 10 * 10)), k1 = 21.4, row1 = 7990, s1 = 500;
				break;
			case "SS 410":
				L1 = (15 / (10 * 10 * 10)), k1 = 24.9, row1 = 7750, s1 = 460;
				break;
		}

		var temp = document.getElementById("T2");
		if(dModel.get('thermowell').length == 0) {
			var v = 0.5
			for(var i = 0; i < 4; i++) {
				$("#T2").trigger("liszt:updated");
				temp.options[temp.options.length] = new Option(v + ' mm', v);
				v = v + 0.5
			}
		}
	}

	obj.withthick = function(opt4) {
		x = parseFloat(opt4 / (10 * 10 * 10));
		toughForWithShealth = ((x / k1) * row1 * L1 * s1);

		if($("#T2").val() != 0) {
			var temp = document.getElementById("T3");
			for(var i = 0; i < 3; i++) {
				$("#T3").trigger("liszt:updated");
				temp.options[0] = new Option('Select', 0);
				temp.options[1] = new Option('MgO powder', 'MgO powder');
				temp.options[2] = new Option('Silicon Compound', 'Silicon Compound');
			}

		}
	}

	obj.FillMaterial = function(opt5) {
		var L, x, k, row, s
		switch(opt5) {
			case "MgO powder":
				L = (15 / (10 * 10 * 10)), x = (2.5 / (10 * 10 * 10)), k = 26.8, row = 3580, s = 877;
				break;
			case "Silicon Compound":
				L = (15 / (10 * 10 * 10)), k = 3, row = 3210, s = 800, x = (2.5 / (10 * 10 * 10)); // k value has to be changed
				break;
		}
		toughForWithThermowell = ((x / k) * row * L * s)
		timeConstantForThermowell = parseFloat(((toughForWithThermowell + toughForBareElement + toughForWithShealth + toughForWithThickness + timeConstantForAir)).toFixed(2));
		//alert(timeConstantForThermowell)
		alert("The Time Constant is" + timeConstantForThermowell + " seconds..");

		var r2 = deltaT * 0.632, u2 = timeConstantForThermowell * 5;
		var thermovelArray = [[0, 0], [timeConstantForThermowell, r2], [u2, deltaT]];
		dModel.set({
			'thermowell' : thermovelArray
		});
		//alert(JSON.stringify(thermovelArray))
	}
	var dynamicChart = {
		chart : {
			renderTo : 'jxgbox_dynamic',
			type : 'spline',
			zoomType: 'x',
		},
		rangeSelector : {
				selected : 1
		},
		credits : {
			enabled : false
		},
		title : {
			text : 'Temperature Vs Time',
			x : -20 //center
		},
		xAxis : {
			title : {
				text : 'Time (sec)'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : 'Temperature (°C)'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' + 'X = ' + this.x + ' Y = ' + this.y.toFixed(2);
			}
		},
		series : [{
			name : 'Bare',
			data : []
		}, {
			name : 'Withsheath',
			data : []
		}, {
			name : 'Thermowell',
			data : []
		},
		{
			name : 'Step-Input',
			data : []
		}]
	}//dynamic

	obj.plotDynamicData = function() {
		dynamicData = [];
		var bare = dModel.get('bare');
		var ws = dModel.get('withSheath');
		var th = dModel.get('thermowell');
		var ref = [[0, 0], [0, th[2][1]], [th[2][0], th[2][1]]];
		if(ws.length == 0 && th.length == 0 && $('#check1').attr('checked')) {
			dynamicChart.series[0].data = bare;
		} else if(th.length == 0) {
			if($('#check2').attr('checked') && $('#check1').attr('checked')) {
				dynamicChart.series[0].data = bare;
				dynamicChart.series[1].data = ws;
			} else {
				if((!$('#check2').attr('checked')) && $('#check1').attr('checked')) {
					dynamicChart.series[0].data = bare;
					dynamicChart.series[1].data = [];
				} else {
					if((!$('#check1').attr('checked')) && $('#check2').attr('checked')) {
						dynamicChart.series[0].data = [];
						dynamicChart.series[1].data = ws;
					}
				}
			}
		} else if(th.length != 0) {
			if($('#check2').attr('checked') && $('#check1').attr('checked') && $('#check3').attr('checked')) {
				dynamicChart.series[0].data = bare;
				dynamicChart.series[1].data = ws;
				dynamicChart.series[2].data = th;
				dynamicChart.series[3].data = ref;
			} else if((!$('#check2').attr('checked')) && $('#check1').attr('checked') && $('#check3').attr('checked')) {
				dynamicChart.series[0].data = bare;
				dynamicChart.series[1].data = [];
				dynamicChart.series[2].data = th;
				dynamicChart.series[3].data = ref;
			} else if((!$('#check1').attr('checked')) && $('#check2').attr('checked') && $('#check3').attr('checked')) {
				dynamicChart.series[0].data = [];
				dynamicChart.series[1].data = ws;
				dynamicChart.series[2].data = th;
				dynamicChart.series[3].data = ref;
			} else if((!$('#check3').attr('checked')) && $('#check2').attr('checked') && $('#check1').attr('checked')) {
				dynamicChart.series[0].data = bare;
				dynamicChart.series[1].data = ws;
				dynamicChart.series[2].data = [];
				dynamicChart.series[3].data = ref;
			}
		}
		var chart = new Highcharts.Chart(dynamicChart);
}
	return {
		obj : obj
	}
})();
