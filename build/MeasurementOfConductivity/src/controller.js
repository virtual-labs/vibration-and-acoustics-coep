CONDUCTIVITY.controller = (function() {
	cnt=0;
	var obj = {}
	var paper3 = new Raphael(document.getElementById('contamDiagram'), 416, 240);
	var measurementModel, temperatureModel, contaminationModel = new CONDUCTIVITY.model.contaminationModel();
	var measurementCollection = new CONDUCTIVITY.collection.measurementCollection();
	var temperatureCollection = new CONDUCTIVITY.collection.temperatureCollection();
	var model, fillIon, contamination = "#C9FF94", i = 1, conc, nxt = 0, dataSet = [], dataSetTemp = [], nxtSet = 0;
	var l = 1, A = 10, B = 1.0, substance, contaminationLayerNeg, contaminationLayerPos;

	obj.measurementDiag = function(paper) {
		var container = paper.path("M 39 80 l 0 140 l 330 0 l 0 -140");
		ionscontainer1 = paper.path("M 40 110 l 10 0  c 20 5 15 5 40 5 c 20 -5 20 -8 55 -5 c 20 5 15 5 40 5  c 20 -5 20 -8 55 -5 c 20 5 10 5 30 5 c 20 -5 20 -8 55 -5 c 20 5 10 5 30 5 l 12 0 l 0 104 l -326 0 l 0 -110").attr({
			'fill' : "#C9FF94"
		});

		var ACvoltageCircle = paper.circle(205, 75, 20);
		var ACvoltageCurve = paper.path("M 189 75 C 205 55 203 93 220 75").attr({
			'stroke' : '#00F'
		});
		var connectNegative = paper.path("M 185 75 l -70 0 l 0 60");
		var connectPositive = paper.path("M 225 75 l 70 0 l 0 60");
		var negativeConductor = paper.rect(102, 135, 25, 60).attr({
			'fill' : '#A9A9A9'
		});
		var negativeSign = paper.path("M 113 145 l 5 0 M 113 163 l 5 0 M 113 180 l 5 0").attr({
			stroke : "black"
		});
		var positiveConductor = paper.rect(282, 135, 25, 60).attr({
			'fill' : '#DC143C'
		});
		var positiveSign = paper.text(293, 145, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});
		var positiveSign = paper.text(293, 163, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});
		var positiveSign = paper.text(293, 180, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});

		var positiveIon1 = paper.set();
		positiveIon1.push(paper.circle(153, 145, 6), paper.path('M 147 145 l -9 0 l 4 4 M 138 145 l 4 -4'), paper.text(152, 145, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var positiveIon2 = paper.set();
		positiveIon2.push(paper.circle(193, 155, 6), paper.path('M 187 155 l -9 0 l 4 4 M 178 155 l 4 -4'), paper.text(192, 155, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var positiveIon3 = paper.set();
		positiveIon3.push(paper.circle(145, 190, 6), paper.path('M 139 190 l -9 0 l 4 4 M 130 190 l 4 -4'), paper.text(144, 190, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var positiveIon4 = paper.set();
		positiveIon4.push(paper.circle(245, 180, 6), paper.path('M 239 180 l -9 0 l 4 4 M 230 180 l 4 -4'), paper.text(244, 180, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var negativeIon1 = paper.set();
		negativeIon1.push(paper.circle(252, 140, 6), paper.path('M 258 140 l 9 0 l -4 4 M 267 140 l -4 -4'), paper.text(251, 134, '_').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var negativeIon2 = paper.set();
		negativeIon2.push(paper.circle(226, 155, 6), paper.path('M 232 155 l 9 0 l -4 4 M 241 155 l -4 -4'), paper.text(225, 149, '_').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var negativeIon3 = paper.set();
		negativeIon3.push(paper.circle(155, 170, 6), paper.path('M 161 170 l 9 0 l -4 4 M 170 170 l -4 -4'), paper.text(154, 164, '_').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));

		var negativeIon4 = paper.set();
		negativeIon4.push(paper.circle(195, 180, 6), paper.path('M 201 180 l 9 0 l -4 4 M 210 180 l -4 -4'), paper.text(194, 174, '_').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		}));
	};
	//M.O.C meaurement diagram

	obj.contaminationDiag = function() {
		var container = paper3.path("M 39 77 l 0 140 l 330 0 l 0 -140");
		ionscontainer2 = paper3.path("M 40 107 l 10 0  c 20 5 15 5 40 5 c 20 -5 20 -8 55 -5 c 20 5 15 5 40 5  c 20 -5 20 -8 55 -5 c 20 5 10 5 30 5 c 20 -5 20 -8 55 -5 c 20 5 10 5 30 5 l 12 0 l 0 104 l -326 0 l 0 -110")
		//ionscontainer.attr({stroke:contamination, fill: contamination});
		var ACvoltageCircle = paper3.circle(205, 75, 20);
		var ACvoltageCurve = paper3.path("M 189 75 C 205 55 203 93 220 75").attr({
			'stroke' : '#00F'
		});
		var connectNegative = paper3.path("M 185 75 l -70 0 l 0 60");
		var connectPositive = paper3.path("M 225 75 l 70 0 l 0 60");
		negativeConductor = paper3.rect(102, 122, 25, 60).attr({
			'fill' : '#A9A9A9'
		});
		negativeSign = paper3.path("M 113 135 l 5 0 M 113 153 l 5 0 M 113 170 l 5 0").attr({
			stroke : "black"
		});
		positiveConductor = paper3.rect(282, 122, 25, 60).attr({
			'fill' : '#DC143C'
		});
		;

		var positiveSign = paper3.text(293, 140, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});
		var positiveSign = paper3.text(293, 160, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});
		var positiveSign = paper3.text(293, 178, '+').attr({
			'font-size' : 12,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});

		var arrowL = paper3.path("M 127 143 l 155 0 l -6 -6 M 282 143 l -6 6 M 127 143 l 6 -6 M 127 143 l 6 6").attr({
			stroke : "black"
		});
		var L = paper3.text(196, 166, 'L').attr({
			'font-size' : 20,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});

		var arrowA = paper3.path("M 92 122 l 0 60 l 6 -6 M 92 182 l -6 -6 M 92 122 l -6 6 M 92 122 l 6 6").attr({
			stroke : "black"
		});
		var A = paper3.text(80, 162, 'A').attr({
			'font-size' : 20,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});

		var arrowB = paper3.path("M 102 190 l 25 0 l -5 -5 M 127 190 l -5 5 M 102 190 l 5 -5 M 102 190 l 5 5").attr({
			stroke : "black"
		});
		var B = paper3.text(115, 215, 'B').attr({
			'font-size' : 20,
			'font-family' : 'helvetica',
			'font-weight' : 'bold'
		});

	}

	obj.setSubstance = function(subs) {
		measurementModel = new CONDUCTIVITY.model.measurementModel();
		measurementModel.set({
			substance : subs
		});
		measurementModel.set({
			'key' : subs
		});
		substance = subs;
	}//obj.setSubstance

	obj.changeSubs = function(subs) {
		switch(subs) {
			case "HCL":
				fillIon = "#C9FF94";
				break;
			case "KCL":
				fillIon = "#FFE7FF";
				break;
			case "H2SO4":
				fillIon = "#FFFFCC";
				break;
			case "NaCl":
				fillIon = "#F5F5F5";
				break;
			case "NaOH":
				fillIon = "#F5F5F5";
				break;
		}
		ionscontainer1.attr({
			stroke : fillIon,
			fill : fillIon
		});
		ionscontainer2.attr({
			stroke : fillIon,
			fill : fillIon
		});
		//ionscontainer2.toBack();
	}
	//measurement level
	obj.setOptions = function() {
		if(measurementModel.get('concentration').length != 0) {
			option = "<option>--select--</option>"

			_.each(measurementModel.get('concentration'), function(result) {
				option += "<option>" + result.value + "%</option>";
			});
			$('#concen-opt-for-measurement').html(option);
			$('#concen-opt-for-measurement').trigger("liszt:updated");
			$('#Conc3').html(option);
			$('#Conc3').trigger("liszt:updated");
			$('#ContConc2').html(option);
			$('#ContConc2').trigger("liszt:updated");
		}//if

	}//obj.setOptions

	obj.showConcentration = function(optvalue) {
		obj1 = {}
		if(!isNaN(optvalue)) {
			_.each(measurementModel.get('concentration'), function(result) {
				if(optvalue == result.value)
					obj1 = result;
			});

			$("#imp").html("<br><label>PPM Concentration : " + parseInt(obj1.value) * 10000 + "</label><br>");
			$("#imp").append("<br><label>Equivalent weight : " + parseFloat(obj1.w) + "</label><br>");
			$("#imp").append("<br><label>Density at 25 &deg;C : " + parseFloat(obj1.C) + "</label><br>");
		} else {
			$("#imp").html("");
			
		}

	}//obj.showConcentration

	obj.calculateSpecificConductance = function() {
		var specificConductance = parseFloat(1000 * obj1.c * obj1.A0 * (1 - obj1.a * (Math.sqrt(obj1.c)) + (obj1.b * obj1.c)) * Math.pow(10, -6));
		    specificConductanceObj = {
			specificConductance : specificConductance,
			Cell : parseFloat(l / A * B),
			//p : ((specificConductance) * obj1.C).toFixed(2), //((specificConductance) / 10).toFixed(2),
			p : (specificConductance).toFixed(2),
			p4 : (specificConductance).toFixed(2)
		}
		//alert(specificConductanceObj.p);
		measurementModel.set({
			specificconductance : specificConductanceObj
		});
	};
	//calculateSpecificConductance

	//check user output if its correct or not and add in collection
	
	obj.checkUserInput = function(userinput) {
		
		var substance = measurementModel.get('substance');
		var high = measurementModel.get('specificconductance').p + 0.05;
		var low = measurementModel.get('specificconductance').p - 0.05;
		var round = Math.round(measurementModel.get('specificconductance').p);
		var optvalue = parseInt(obj1.value)
		if(!(isNaN(userinput))) {
			if(measurementModel.get('specificconductance').p == userinput || measurementModel.get('specificconductance').p4 == userinput || round == userinput || (userinput >= low && userinput <= high)) {
				var id = measurementModel.get('key')
				var existingModel = measurementCollection.get(id);

				dataSet.push([optvalue, userinput]);
				dataSet = dataSet.sort(function(a, b) {
					return a[1] - b[1];
				});
				if(!existingModel) {
					measurementModel.set({
						graphdata : dataSet
					});
					var len = dataSet.length
					if(substance == 'HCL' || substance == 'KCL') {
						if(len >= 3) {
							measurementCollection.add(measurementModel);
							$('#plotMeasure').attr({
								'disabled' : false
							});
							$('#plotMeasure').addClass('greenbtn');
							$('#plotMeasure1').hide();
							$('#plotMeasure').show();
						}
					} else {
						if(substance == 'H2SO4' || substance == 'NaCl') {
							if(len >= 1) {
								measurementCollection.add(measurementModel);
								$('#plotMeasure').attr({
									'disabled' : false
								});
								$('#plotMeasure').addClass('greenbtn');
							}
						} else {
							if(substance == 'NaOH') {
								if(len >= 2) {
									measurementCollection.add(measurementModel);
									$('#plotMeasure').attr({
										'disabled' : false
									});
									$('#plotMeasure').addClass('greenbtn');
								}
							}
						}
					}
				} else {
					measurementModel.set({
						graphdata : dataSet
					});
				}
				$("#submitMeasure").html("<span class='label'>Correct</span>");
				setTimeout(function() {
					$("#submitMeasure").html("<span class='label'>Submit</span>");
				}, 3000);
				$("#l1Ans").html(userinput);
			} else {
				cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer");
					alert("Correct Answer is "+ (specificConductanceObj.p));
					cnt=0;
				}
				$("#submitMeasure").addClass('redbtn');
				$("#submitMeasure").effect("shake", {
					times : 2
				}, 30);
				$("#submitMeasure").html("<span class='label'>Re-Calculate</span>");
				setTimeout(function() {
					$("#submitMeasure").removeClass('redbtn');
					$("#submitMeasure").html("<span class='label'>Submit</span>");
				}, 3000);
			}
		} else {
			alert("Please Enter Numerical Value");
		}

	}//obj.checkUserInput

	obj.next = function() {
		dataSet = [];
		nxt++;
		storeData = graphData;
	}
	var graphOne = {
		chart : {
			renderTo : 'jxgbox_gphone',
			type: 'line',
			zoomType : 'x'
		},
		rangeSelector : {
			selected : 1
		},
		credits : {
			enabled : false
		},
		title : {
			text : 'Concentration vs Conductivity',
			x : -20
		},
		xAxis : {
			title : {
				text : 'Concentration in Percentage'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : 'Conductivity in Siemens'
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

	obj.plotMeasurement = function() {
		$('#tempLevel').attr({
			'disabled' : false
		});
		$('#tempLevel').addClass('greenbtn');
		graphOne.series = [];
		graphData = [];
		var id = measurementModel.get('key');
		var c = measurementCollection.get(id);
		var data = c.get('graphdata');
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
			graphOne.series[i].name = "Measurement Graph " + (i + 1);
			graphOne.series[i].data = graphData[i];
		}

		var chart = new Highcharts.Chart(graphOne);
	}
	//temperature level

	obj.setConcentration = function(optvalue) {
		temperatureModel = new CONDUCTIVITY.model.temperatureModel();
		temperatureModel.set({
			concentration : optvalue
		});
		var setId = substance + optvalue;
		temperatureModel.set({
			'id' : setId
		});
		$("#imp").html("<br><label>Temperature Range from: 0&deg;C to 50&deg;C</label><br>");
		$("#imp").append("<br><label>Temperature Co-efficient : " + parseFloat(obj1.Tc) + "</label><br>");
		$("#imp").append("");
	}//obj.setConcentration

	obj.getTemperature = function() {
		get = rand(0, 50);
		s3 = parseFloat(obj1.CR * [1 + obj1.Tc * (get - 25)] * Math.pow(10, -6));
		k = parseFloat(s3);
	    conductivityAtTempObj = {
			conductivityAtTemp : s3,
			k : k.toFixed(2)
		}
		temperatureModel.set({
			conductivityAtTemp : conductivityAtTempObj
		})
		//alert(conductivityAtTempObj.k);
		return get
	}//obj.getTemperature
	rand = function(min, max) {
		return Math.round(min + Math.random() * (max - min));
	}
	//cnt=0;
	obj.checkCondunctivityAtInterest = function(userVal) {
		
		var higher = parseFloat(temperatureModel.get('conductivityAtTemp').k + 0.05);
		var lower = temperatureModel.get('conductivityAtTemp').k - 0.05;
		var round = Math.round(temperatureModel.get('conductivityAtTemp').k)
		var substance = temperatureModel.get('substance');
		
		if(!(isNaN(userVal))) {
			if(temperatureModel.get('conductivityAtTemp').conductivityAtTemp == userVal || temperatureModel.get('conductivityAtTemp').k == userVal || (userVal <= higher && userVal >= lower) || userVal == round) {
				var id = temperatureModel.get('id')
				var existingModel = temperatureCollection.get(id);
				dataSetTemp.push([get, userVal]);
				dataSetTemp = dataSetTemp.sort(function(a, b) {
					return a[1] - b[1];
				});
				if(!existingModel) {
					temperatureModel.set({
						graphdata : dataSetTemp
					});
					if(dataSetTemp.length >= 3) {
						temperatureCollection.add(temperatureModel);
						$('#plotTemp').attr({
							'disabled' : false
						});
						$('#plotTemp1').hide();
						$('#plotTemp').show();
						$('#plotTemp').addClass('greenbtn');
						$("#nextSetTemp").attr('disabled', false);
						$("#nextSetTemp").addClass('greenbtn');
					}
				} else {
					temperatureModel.set({
						graphdata : dataSetTemp
					});
				}
				$("#submitTemp").html("<span class='label'>Correct</span>");
				setTimeout(function() {
					$("#submitTemp").html("<span class='label'>Submit</span>");
				}, 3000);
				return true

			} else {
				cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer");
					alert("Correct Answer is "+ conductivityAtTempObj.k);
					cnt=0;
				}
				$("#submitTemp").addClass('redbtn');
				$("#submitTemp").effect("shake", {
					times : 2
				}, 30);
				$("#submitTemp").html("<span class='label'>Re-Calculate</span>");
				setTimeout(function() {
					$("#submitTemp").removeClass('redbtn');
					$("#submitTemp").html("<span class='label'>Submit</span>");
				}, 3000);
				return false;
			}
		} else {
			alert("Please Enter Numerical Value");
			return false
		}
	}

	obj.nextSet = function() {
		dataSetTemp = [];
		nxtSet++;
		storeDataTemp = graphDataTemp;
		$('#plotTemp').attr({
			'disabled' : true
		});
		$('#plotTemp').removeClass('greenbtn');
		
	}
	var graphTwo = {
		chart : {
			renderTo : 'jxgbox_gphtwo',
			type: 'line',
			zoomType: 'x',
		},
		rangeSelector : {
			selected : 1
		},
		credits : {
			enabled : false
		},
		title : {
			text : 'Temperature vs Conductivity',
			x : -20
		},
		xAxis : {
			title : {
				text : 'Temperature in Degree Celsius'
			},
			labels : {
				formatter : function() {
					return this.value;
				}
			}
		},
		yAxis : {
			title : {
				text : 'Conductivity in Siemens'
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
	obj.plotTemperature = function() {
		$('#contaminLevel').attr({
			'disabled' : false
		});
		$('#contaminLevel').addClass('greenbtn');
		graphTwo.series = [];
		graphDataTemp = [];
		var id = temperatureModel.get('id');
		var c = temperatureCollection.get(id);
		var data = c.get('graphdata');
		if(data != 0 && nxtSet == 0) {
			graphDataTemp.push(data);
		} else {
			graphDataTemp = storeDataTemp;
			graphDataTemp.push(data);
		}

		for(var i = 0; i < graphDataTemp.length; i++) {
			graphTwo.series.push({
				name : '',
				data : []
			});
			graphTwo.series[i].name = "Temperature Graph " + (i + 1);
			graphTwo.series[i].data = graphDataTemp[i];
		}
		var chart = new Highcharts.Chart(graphTwo);
	}
	//contamination level

	obj.setConcentrationForContamination = function(opt) {
		s8 = parseFloat(1000 * obj1.c * obj1.A0 * (1 - obj1.a * (Math.sqrt(obj1.c)) + (obj1.b * obj1.c)) * Math.pow(10, -6)).toFixed(2);
		$("#Sc").html(+s8);
	};
	valueCellConst = function() {
		s5 = parseFloat(1 / (10 * 1.0));
		ce = s5 * s4;
	}

	obj.setContamination = function(opt) {
		
		contaminationModel.set({
			contamination : opt
		});
		increaseLevelofContam();
		calculateContamination();
	}
	increaseLevelofContam = function() {
		var contam = contaminationModel.get('contamination');
		if(contaminationLayerNeg != undefined && contaminationLayerPos != undefined) {
			contaminationLayerNeg.remove();
			contaminationLayerPos.remove();
		}
		switch(contam) {
			case 0.1:
				contaminationLayerNeg = paper3.rect(101.5, 121.5, 25.5, 61.5).attr({
					stroke : '#686868'
				});
				contaminationLayerPos = paper3.rect(281.5, 121.5, 25.5, 61.5).attr({
					stroke : '#686868'
				});
				break;
			case 0.2:
				contaminationLayerNeg = paper3.rect(101, 121, 27, 62.5).attr({
					stroke : '#686868'
				});
				contaminationLayerPos = paper3.rect(281, 121, 27, 62.5).attr({
					stroke : '#686868'
				});
				break;
			case 0.3:
				contaminationLayerNeg = paper3.rect(100.5, 120.5, 27.5, 63).attr({
					'stroke-width' : 3,
					stroke : '#686868'
				});
				contaminationLayerPos = paper3.rect(280.5, 120.5, 27.5, 63).attr({
					'stroke-width' : 3,
					stroke : '#686868'
				});
				break;
			case 0.4:
				contaminationLayerNeg = paper3.rect(99.5, 120, 27.5, 63).attr({
					'stroke-width' : 4,
					stroke : '#686868'
				});
				contaminationLayerPos = paper3.rect(279.5, 120, 27.5, 63).attr({
					'stroke-width' : 4,
					stroke : '#686868'
				});
				break;
			case 0.5:
				contaminationLayerNeg = paper3.rect(99, 119, 27.5, 63).attr({
					'stroke-width' : 5,
					stroke : '#686868'
				});
				contaminationLayerPos = paper3.rect(279, 119, 27.5, 63).attr({
					'stroke-width' : 5,
					stroke : '#686868'
				});
				break;
		}
	}
	calculateContamination = function() {
		obj4 = contaminationModel.get('contaminationVal');
		obj4 = obj4[0];
		s8 = parseFloat(1000 * obj1.c * obj1.A0 * (1 - obj1.a * (Math.sqrt(obj1.c)) + (obj1.b * obj1.c)) * Math.pow(10, -6)).toFixed(2);
		s4 = parseFloat(obj4.lnew / (obj4.A * obj4.Bnew)).toFixed(2);
		M = ((s8 * s4 ).toFixed(2));
		contaminationModel.set({
			'm' : M
		});
		//alert(M);
		$("#MCond").val(M);
		$("#CEText").html(s4);
	}
	obj.checkContamination = function(userAns) {
		var ans = contaminationModel.get('m');
		var higher = ans + 0.05;
		var lower = ans - 0.05;
		var round = Math.round(ans);
		if(ans == userAns || (userAns <= higher && userAns >= lower) || round == lower) {
			$("#submitCont").html("<span class='label'>Correct</span>");
			setTimeout(function() {
				$("#submitCont").html("<span class='label'>Submit</span>");
			}, 3000);
		} else {
			cnt++;
				if(cnt==3)
				{
					alert("Please verify your answer");
					alert("Correct Answer is "+ M);
					cnt=0;
				}
			$("#submitCont").addClass('redbtn');
			$("#submitCont").effect("shake", {
				times : 2
			}, 30);
			$("#submitCont").html("<span class='label'>Re-Calculate</span>");
			setTimeout(function() {
				$("#submitCont").removeClass('redbtn');
				$("#submitCont").html("<span class='label'>Submit</span>");
			}, 3000);
		}
	}
	formula = function() {
		$("#fomulabtnMeasurement").click(function() {
			window.open("formula1.html", "Formula", "left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
		});
		$("#fomulabtnTemp").click(function() {
			window.open("formula2.html", "Formula", "left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
		});
		$("#fomulabtnContam").click(function() {
			window.open("formula3.html", "Formula", "left=20,top=20,width=600,height=350,toolbar=1,resizable=0,scrollbars=yes");
		});
	}();
	return {
		obj : obj
	}
})();
